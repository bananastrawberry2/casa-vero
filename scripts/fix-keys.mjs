// Fix missing _keys and preview config for all products
// Run: cd C:\Users\User\furniture-shop && node scripts/fix-keys.mjs

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

async function run() {
  console.log("🔧 Fixing missing keys...\n");

  const products = await client.fetch(`*[_type == "product"]{ _id, name, images }`);
  console.log(`   Found ${products.length} products\n`);

  let fixed = 0;

  for (const p of products) {
    if (!p.images || p.images.length === 0) continue;

    const needsFix = p.images.some(img => !img._key);
    if (!needsFix) continue;

    const fixedImages = p.images.map(img => ({
      ...img,
      _key: img._key || `img-${Math.random().toString(36).slice(2, 10)}`,
    }));

    await client.patch(p._id).set({ images: fixedImages }).commit();
    console.log(`   ✅ ${p.name?.el || p.name?.en || p._id} — fixed ${p.images.length} images`);
    fixed++;
  }

  console.log(`\n✨ Fixed ${fixed} products!`);
}

run().catch(e => { console.error(e); process.exit(1); });
