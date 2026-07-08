// Update all product images with real furniture photos
// Run: cd C:\Users\User\furniture-shop && node scripts/update-images.mjs

import { createClient } from "@sanity/client";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");

function getEnv(name) {
  try {
    const c = readFileSync(envPath, "utf-8");
    const m = c.match(new RegExp(`${name}=(.+)`));
    return m ? m[1].trim() : null;
  } catch { return null; }
}

const token = process.env.SANITY_API_TOKEN || getEnv("SANITY_API_TOKEN");
if (!token) { console.error("❌ Need SANITY_API_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "g1u4zgq6",
  dataset: "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Real Unsplash furniture images - guaranteed to work
const IMAGE_MAP = {
  "trapezia": "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&h=800&fit=crop",
  "karekles": "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop",
  "mpoufes": "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800&h=800&fit=crop",
  "grafeia": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=800&fit=crop",
  "trapezakia": "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&h=800&fit=crop",
  "vivliothikes": "https://images.unsplash.com/photo-1588279102928-0f0a1e71a30d?w=800&h=800&fit=crop",
  "diakosmisi": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop",
  default: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop",
};

const CATEGORY_IMAGES = {
  "Τραπέζια": "trapezia",
  "Tables": "trapezia",
  "Καρέκλες": "karekles",
  "Chairs": "karekles",
  "Μπουφέδες": "mpoufes",
  "Buffets": "mpoufes",
  "Γραφεία": "grafeia",
  "Desks": "grafeia",
  "Τραπεζάκια": "trapezakia",
  "Coffee Tables": "trapezakia",
  "Βιβλιοθήκες": "vivliothikes",
  "Bookshelves": "vivliothikes",
  "Διακόσμηση": "diakosmisi",
  "Decoration": "diakosmisi",
};

async function uploadImage(url, filename) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, {
    filename: `${filename}.jpg`,
    contentType: "image/jpeg",
  });
}

async function run() {
  console.log("🖼️  Αντικατάσταση εικόνων...\n");

  const products = await client.fetch(`*[_type == "product"]{ _id, name, category->{title} }`);
  console.log(`   Βρέθηκαν ${products.length} προϊόντα\n`);

  let ok = 0, fail = 0;

  for (const p of products) {
    const name = p.name?.el || "Product";
    const catKey = p.category?.title?.el || p.category?.title?.en || "default";
    const imgKey = CATEGORY_IMAGES[catKey] || "default";
    const url = IMAGE_MAP[imgKey] || IMAGE_MAP.default;

    try {
      console.log(`   ${name}...`);
      const asset = await uploadImage(url, name.replace(/[^a-z0-9]/gi, "_"));
      await client.patch(p._id).set({
        images: [{ _type: "image", asset: { _type: "reference", _ref: asset._id } }]
      }).commit();
      console.log(`   ✅ ${name}\n`);
      ok++;
    } catch (err) {
      console.log(`   ❌ ${name}: ${err.message}\n`);
      fail++;
    }
  }

  console.log(`\n✨ Ολοκληρώθηκε! ${ok} ενημερώθηκαν, ${fail} απέτυχαν.`);
}

run().catch(e => { console.error(e); process.exit(1); });
