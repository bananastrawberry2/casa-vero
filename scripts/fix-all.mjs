// Ultimate fix: proper images per product + SEO + category images
// Run: cd C:\Users\User\furniture-shop && node scripts/fix-all.mjs

import { createClient } from "@sanity/client";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");
function getEnv(n) { try { const c = readFileSync(envPath, "utf-8"); const m = c.match(new RegExp(`${n}=(.+)`)); return m ? m[1].trim() : null; } catch { return null; } }

const token = process.env.SANITY_API_TOKEN || getEnv("SANITY_API_TOKEN");
if (!token) { console.error("❌ Need SANITY_API_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "g1u4zgq6",
  dataset: "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── PERFECT IMAGES for each product ─────────
const PRODUCT_IMAGES = {
  "Aria Στρογγυλό Τραπέζι MDF": { url: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800", seo: "Μοντέρνο στρογγυλό τραπέζι φαγητού από MDF - Casa Vero" },
  "Delta Ορθογώνιο Επεκτεινόμενο Τραπέζι": { url: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=800", seo: "Επεκτεινόμενο ορθογώνιο τραπέζι από δρυ - Casa Vero" },
  "Nova Κεραμικό Τραπέζι": { url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800", seo: "Κεραμικό τραπέζι φαγητού πολυτελείας - Casa Vero" },
  "Elina Υφασμάτινη Καρέκλα": { url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800", seo: "Υφασμάτινη καρέκλα τραπεζαρίας με ξύλινη βάση - Casa Vero" },
  "Luna Δερμάτινη Καρέκλα": { url: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800", seo: "Δερμάτινη καρέκλα τραπεζαρίας πολυτελείας - Casa Vero" },
  "Rosa Ξύλινη Καρέκλα Οξιά": { url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800", seo: "Ξύλινη καρέκλα από μασίφ οξιά - Casa Vero" },
  "Iris Καρέκλα Μπαρ": { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", seo: "Ψηλή καρέκλα μπαρ ξύλινη - Casa Vero" },
  "Flora Μπουφές με 2 Πόρτες": { url: "https://images.unsplash.com/photo-1597006335779-2726b2b6c3ed?w=800", seo: "Μοντέρνος μπουφές σαλονιού με 2 πόρτες - Casa Vero" },
  "Malta": { url: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800", seo: "Malta μπουφές κλασικής κομψότητας - Casa Vero" },
  "Melania": { url: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800", seo: "Melania μπουφές με καθρέφτη - Casa Vero" },
  "Minimal": { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800", seo: "Minimal μπουφές μινιμαλιστικός - Casa Vero" },
  "Minimal Floors": { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800", seo: "Minimal Floors επιδαπέδιος μπουφές - Casa Vero" },
  "Noelia": { url: "https://images.unsplash.com/photo-1597006335779-2726b2b6c3ed?w=800", seo: "Noelia ρομαντικός μπουφές - Casa Vero" },
  "Woody Γραφείο Δρύινο": { url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800", seo: "Δρύινο γραφείο home office - Casa Vero" },
  "Soho Γραφείο Λευκό": { url: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800", seo: "Λευκό γραφείο μοντέρνο - Casa Vero" },
  "Cube Δρύινο Τραπεζάκι": { url: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800", seo: "Δρύινο τραπεζάκι σαλονιού - Casa Vero" },
  "Nest Σετ 2 Τραπεζάκια": { url: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800", seo: "Σετ τραπεζάκια σαλονιού που χωράνε - Casa Vero" },
  "Henry Ψηλή Δρύινη Ραφιέρα": { url: "https://images.unsplash.com/photo-1588279102928-0f0a1e71a30d?w=800", seo: "Ψηλή βιβλιοθήκη ράφια δρυ - Casa Vero" },
  "Stone Κεραμικό Βάζο": { url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800", seo: "Χειροποίητο κεραμικό βάζο διακόσμηση - Casa Vero" },
  "Linen Λινό Μαξιλάρι": { url: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800", seo: "Λινό διακοσμητικό μαξιλάρι - Casa Vero" },
  "Amber Διακοσμητικό Μπολ": { url: "https://images.unsplash.com/photo-1565379173305-c7e3ad9354b5?w=800", seo: "Γυάλινο διακοσμητικό μπολ - Casa Vero" },
};

const CATEGORY_IMAGES = {
  "Τραπέζια": "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800",
  "Καρέκλες": "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
  "Μπουφέδες": "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800",
  "Γραφεία": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
  "Τραπεζάκια": "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800",
  "Βιβλιοθήκες": "https://images.unsplash.com/photo-1588279102928-0f0a1e71a30d?w=800",
  "Διακόσμηση": "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800",
};

async function upload(url, name) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename: `${name}.jpg`, contentType: "image/jpeg" });
}

async function run() {
  console.log("🚀 Starting full fix...\n");

  // ─── 1. Fix product images + SEO ──────────
  console.log("📦 Fixing products...\n");
  const products = await client.fetch(`*[_type == "product"]{ _id, name, seo, images }`);
  let done = 0;

  for (const p of products) {
    const n = p.name?.el;
    const imgData = PRODUCT_IMAGES[n];
    if (!imgData) { console.log(`   ⏭️  ${n} — no image`); continue; }

    try {
      console.log(`   📥 ${n}...`);
      const asset = await upload(imgData.url, n.replace(/[^a-z0-9]/gi, "_"));

      // Fix images with _key + SEO
      const patch = client.patch(p._id);

      if (p.images?.length) {
        const fixed = p.images.map(img => ({
          ...img,
          _key: img._key || `img-${Math.random().toString(36).slice(2,10)}`,
        }));
        patch.set({ images: fixed });
      } else {
        patch.set({ images: [{ _type: "image", _key: `img-${Math.random().toString(36).slice(2,10)}`, asset: { _type: "reference", _ref: asset._id } }] });
      }

      // Add SEO if missing
      if (!p.seo?.title) {
        patch.set({
          seo: {
            _type: "seo",
            title: imgData.seo,
            description: `${n} — Χειροποίητο έπιπλο υψηλής ποιότητας από τη Casa Vero. Μοναδικό σχέδιο, κορυφαία υλικά, παράδοση σε όλη την Ελλάδα.`
          }
        });
      }

      await patch.commit();
      console.log(`   ✅ ${n}\n`);
      done++;
    } catch (err) {
      console.log(`   ❌ ${n}: ${err.message}\n`);
    }
  }

  // ─── 2. Fix category images ───────────────
  console.log("📁 Fixing categories...\n");
  const cats = await client.fetch(`*[_type == "category"]{ _id, title }`);
  for (const c of cats) {
    const n = c.title?.el;
    const url = CATEGORY_IMAGES[n];
    if (!url) continue;
    try {
      const asset = await upload(url, n.replace(/[^a-z0-9]/gi, "_"));
      await client.patch(c._id).set({ image: { _type: "image", asset: { _type: "reference", _ref: asset._id } } }).commit();
      console.log(`   ✅ ${n}\n`);
    } catch (err) {
      console.log(`   ❌ ${n}: ${err.message}\n`);
    }
  }

  console.log(`✨ Done! Fixed ${done} products + categories.`);
}

run().catch(e => { console.error(e); process.exit(1); });
