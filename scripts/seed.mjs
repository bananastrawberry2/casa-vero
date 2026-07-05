// Seed script: Add category and products to Sanity
// Run with: node scripts/seed.mjs
// Requires .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load env
const envPath = path.resolve(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");

function getEnvVar(name) {
  const match = envContent.match(new RegExp(`${name}=(.+)`));
  return match ? match[1].trim() : null;
}

const projectId = getEnvVar("NEXT_PUBLIC_SANITY_PROJECT_ID") || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

// You need to create a Sanity API token at https://www.sanity.io/manage/project/PROJECT_ID/api#tokens
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("\n❌ Χρειάζεται Sanity API token!");
  console.error("Πήγαινε: https://www.sanity.io/manage/project/" + projectId + "/api");
  console.error("Πάτα 'Add API token' → βάλε όνομα 'Seed' → role 'Editor' → δημιούργησέ το");
  console.error("Μετά τρέξε: set SANITY_API_TOKEN=το_token_σου && node scripts/seed.mjs\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function uploadImage(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch ${imageUrl}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType: "image/png",
    });
    return asset;
  } catch (err) {
    console.warn(`  ⚠️ Could not upload ${filename}: ${err.message}`);
    return null;
  }
}

// Generate a simple colored placeholder image SVG
function generatePlaceholderImage(productName, accentColor = "#a87647") {
  const colors = ["#a87647", "#8c5e3c", "#724d35", "#c49e6e", "#b68952"];
  const bgColor = colors[Math.floor(Math.random() * colors.length)];
  const svg = `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="800" fill="${bgColor}" />
    <rect x="200" y="200" width="400" height="350" rx="20" fill="rgba(255,255,255,0.15)" />
    <rect x="250" y="250" width="300" height="250" rx="10" fill="rgba(255,255,255,0.1)" />
    <circle cx="400" cy="375" r="60" fill="rgba(255,255,255,0.08)" />
    <text x="400" y="700" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-family="Georgia, serif" font-size="28">${productName}</text>
  </svg>`;
  return Buffer.from(svg);
}

async function seed() {
  console.log("🚀 Seeding Sanity...\n");

  // ─── 1. Create Category ─────────────────────────────
  console.log("📁 Creating category...");
  const catResult = await client.create({
    _type: "category",
    title: { el: "Μπουφές", en: "Buffets" },
    slug: { _type: "slug", current: "mpoufes" },
    description: { el: "Κομψοί μπουφές για κάθε χώρο", en: "Elegant buffets for every space" },
    order: 1,
  });
  const catId = catResult._id;
  console.log(`  ✅ Category created: ${catId}\n`);

  // ─── 2. Create Products ─────────────────────────────
  const products = [
    {
      name: { el: "Malta", en: "Malta" },
      slug: "malta",
      price: 650,
      compareAtPrice: 780,
      description: {
        el: "Ο μπουφές Malta συνδυάζει την κλασική κομψότητα με τη μοντέρνα λειτουργικότητα. Κατασκευασμένος από υψηλής ποιότητας ξύλο, προσφέρει άνετους αποθηκευτικούς χώρους με συρτάρια και ράφια. Η διαχρονική του σχεδίαση ταιριάζει σε κάθε σαλόνι.",
        en: "The Malta buffet combines classic elegance with modern functionality. Made from high-quality wood, it offers ample storage with drawers and shelves. Its timeless design suits any living room."
      },
      dimensions: { width: 160, height: 85, depth: 45, unit: "cm" },
      materials: ["Ξύλο", "Μέταλλο"],
      features: [
        { el: "3 συρτάρια με αθόρυβη οδήγηση", en: "3 drawers with soft-close mechanism" },
        { el: "2 ντουλάπια με ρυθμιζόμενα ράφια", en: "2 cabinets with adjustable shelves" },
        { el: "Λαβές από μέταλλο", en: "Metal handles" },
      ],
      inStock: true,
      featured: true,
    },
    {
      name: { el: "Melania", en: "Melania" },
      slug: "melania",
      price: 720,
      description: {
        el: "Ο μπουφές Melania είναι ένα εντυπωσιακό έπιπλο που τραβά την προσοχή με τη μοναδική του σχεδίαση. Ιδανικός για όσους θέλουν να ξεχωρίζουν, προσφέρει άνετη αποθήκευση και κομψή εμφάνιση.",
        en: "The Melania buffet is an impressive piece that draws attention with its unique design. Ideal for those who want to stand out, it offers comfortable storage and elegant appearance."
      },
      dimensions: { width: 150, height: 90, depth: 45, unit: "cm" },
      materials: ["Ξύλο", "Γυαλί"],
      features: [
        { el: "Design με καθρέφτη", en: "Mirror design" },
        { el: "4 συρτάρια", en: "4 drawers" },
        { el: "Γυάλινες προθήκες", en: "Glass display cabinets" },
      ],
      inStock: true,
      featured: true,
    },
    {
      name: { el: "Minimal", en: "Minimal" },
      slug: "minimal",
      price: 700,
      description: {
        el: "Ο μπουφές Minimal ενσαρκώνει την απόλυτη μινιμαλιστική αισθητική. Με καθαρές γραμμές και λιτό σχεδιασμό, είναι η ιδανική επιλογή για μοντέρνους χώρους. Η ποιότητα κατασκευής και τα προσεγμένα υλικά εγγυώνται μακροχρόνια χρήση.",
        en: "The Minimal buffet embodies the ultimate minimalist aesthetic. With clean lines and simple design, it's the ideal choice for modern spaces. Quality construction and carefully selected materials guarantee long-lasting use."
      },
      dimensions: { width: 180, height: 85, depth: 45, unit: "cm" },
      materials: ["Ξύλο MDF", "Μέταλλο"],
      colors: [
        { name: { el: "Λευκό", en: "White" }, hex: "#FFFFFF" },
        { name: { el: "Μαύρο", en: "Black" }, hex: "#000000" },
        { name: { el: "Γκρι", en: "Grey" }, hex: "#808080" },
      ],
      features: [
        { el: "Μινιμαλιστικό design", en: "Minimalist design" },
        { el: "Κρυφές λαβές", en: "Hidden handles" },
        { el: "6 επιλογές χρωμάτων", en: "6 color options" },
      ],
      inStock: true,
      featured: true,
    },
    {
      name: { el: "Minimal Floors", en: "Minimal Floors" },
      slug: "minimal-floors",
      price: 850,
      description: {
        el: "Ο Minimal Floors είναι μια εντυπωσιακή εκδοχή της σειράς Minimal, με επιδαπέδια σχεδίαση που προσφέρει ακόμα μεγαλύτερη επιφάνεια αποθήκευσης. Ιδανικός για μεγάλους χώρους και εντυπωσιακές εισόδους.",
        en: "The Minimal Floors is an impressive version of the Minimal series, with a floor-standing design offering even greater storage surface. Ideal for large spaces and impressive entrances."
      },
      dimensions: { width: 200, height: 90, depth: 50, unit: "cm" },
      materials: ["Ξύλο MDF", "Αλουμίνιο"],
      colors: [
        { name: { el: "Λευκό", en: "White" }, hex: "#FFFFFF" },
        { name: { el: "Μαύρο", en: "Black" }, hex: "#000000" },
      ],
      features: [
        { el: "Επιδαπέδια βάση", en: "Floor base" },
        { el: "Αυξημένη χωρητικότητα", en: "Increased capacity" },
        { el: "LED φωτισμός (προαιρετικός)", en: "LED lighting (optional)" },
      ],
      inStock: true,
      featured: false,
    },
    {
      name: { el: "Noelia", en: "Noelia" },
      slug: "noelia",
      price: 680,
      description: {
        el: "Ο μπουφές Noelia ξεχωρίζει για τη ρομαντική του διάθεση και τις καμπύλες γραμμές του. Κατασκευασμένος με μεράκι, προσθέτει μια νότα κομψότητας σε κάθε χώρο. Ο τέλειος συνδυασμός αισθητικής και λειτουργικότητας.",
        en: "The Noelia buffet stands out for its romantic mood and curved lines. Crafted with care, it adds a touch of elegance to any space. The perfect combination of aesthetics and functionality."
      },
      dimensions: { width: 140, height: 85, depth: 45, unit: "cm" },
      materials: ["Ξύλο", "Κεραμικό"],
      features: [
        { el: "Διακοσμητικές καμπύλες", en: "Decorative curves" },
        { el: "Κεραμικές λαβές", en: "Ceramic handles" },
        { el: "3 ευρύχωρα συρτάρια", en: "3 spacious drawers" },
      ],
      inStock: true,
      featured: true,
    },
  ];

  console.log("🏭 Creating products...\n");

  for (const p of products) {
    console.log(`  Creating: ${p.name.el}...`);

    // Upload placeholder image
    const imageBuffer = generatePlaceholderImage(p.name.el);
    const asset = await client.assets.upload("image", imageBuffer, {
      filename: `${p.slug}.png`,
      contentType: "image/png",
    });

    const productDoc = {
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      description: {
        _type: "blockContent",
        el: [
          { _type: "block", style: "normal", children: [{ _type: "span", text: p.description.el }] }
        ],
        en: [
          { _type: "block", style: "normal", children: [{ _type: "span", text: p.description.en }] }
        ],
      },
      images: [{ _type: "image", asset: { _type: "reference", _ref: asset._id } }],
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      category: { _type: "reference", _ref: catId },
      dimensions: p.dimensions,
      materials: p.materials,
      colors: p.colors?.map(c => ({
        name: c.name,
        hex: c.hex,
      })),
      features: p.features,
      inStock: p.inStock,
      featured: p.featured,
    };

    const result = await client.create(productDoc);
    console.log(`  ✅ ${p.name.el} created! ID: ${result._id}\n`);
  }

  console.log("✨ Done! All products added to Sanity.");
}

seed().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
