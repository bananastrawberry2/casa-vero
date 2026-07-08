// Seed script: Add categories and products from Habitat Greece (modified)
// Run: cd C:\Users\User\furniture-shop && node scripts/seed-habitat.mjs
// Requires SANITY_API_TOKEN env var

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "..", ".env.local");

function getEnvVar(name) {
  try {
    const content = fs.readFileSync(envPath, "utf-8");
    const match = content.match(new RegExp(`${name}=(.+)`));
    return match ? match[1].trim() : null;
  } catch { return null; }
}

const projectId = "g1u4zgq6";
const token = process.env.SANITY_API_TOKEN || getEnvVar("SANITY_API_TOKEN");

if (!token) {
  console.error("❌ Χρειάζεται SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: "production",
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function generateImage(name, bg) {
  const svg = `<svg width="800" height="800" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
    <rect width="800" height="800" fill="${bg}"/>
    <rect x="150" y="250" width="500" height="300" rx="30" fill="rgba(255,255,255,0.12)"/>
    <rect x="200" y="300" width="400" height="180" rx="12" fill="rgba(255,255,255,0.08)"/>
    <text x="400" y="700" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="Georgia,serif" font-size="22">${name}</text>
  </svg>`;
  return Buffer.from(svg);
}

const COLORS = ["#8d6648","#a67c5b","#75533c","#b69276","#634635","#533c2e"];

async function uploadImage(name) {
  const bg = COLORS[Math.floor(Math.random() * COLORS.length)];
  const buffer = generateImage(name, bg);
  return client.assets.upload("image", buffer, {
    filename: `${makeSlug(name)}.png`,
    contentType: "image/png",
  });
}

async function seed() {
  console.log("🚀 Προσθήκη κατηγοριών & προϊόντων...\n");

  // ── Categories ──────────────────────────────
  const categories = [
    { el: "Τραπέζια", en: "Tables", slug: "trapezia" },
    { el: "Καρέκλες", en: "Chairs", slug: "karekles" },
    { el: "Μπουφέδες", en: "Buffets", slug: "mpoufes" },
    { el: "Γραφεία", en: "Desks", slug: "grafeia" },
    { el: "Τραπεζάκια", en: "Coffee Tables", slug: "trapezakia" },
    { el: "Βιβλιοθήκες", en: "Bookshelves", slug: "vivliothikes" },
    { el: "Διακόσμηση", en: "Decoration", slug: "diakosmisi" },
  ];

  console.log("📁 Δημιουργία κατηγοριών...");
  const catMap = {};
  for (const c of categories) {
    const result = await client.create({
      _type: "category",
      title: { el: c.el, en: c.en },
      slug: { _type: "slug", current: c.slug },
      order: Object.keys(catMap).length + 1,
    });
    catMap[c.slug] = result._id;
    console.log(`  ✅ ${c.el}`);
  }

  // ── Products (modified from Habitat Greece) ──
  const products = [
    // Τραπέζια
    { name: { el: "Aria Στρογγυλό Τραπέζι MDF", en: "Aria Round MDF Table" }, slug: "aria-round-table", category: "trapezia", price: 480, compareAtPrice: 590, materials: ["MDF", "Ξύλο"], dimensions: { width: 120, height: 76, depth: 120, unit: "cm" }, featured: true,
      desc: { el: "Κομψό στρογγυλό τραπέζι φαγητού από MDF υψηλής ποιότητας. Ιδανικό για μικρές τραπεζαρίες με μοντέρνο στιλ.", en: "Elegant round dining table made of high-quality MDF. Ideal for small dining rooms with modern style." } },
    { name: { el: "Delta Ορθογώνιο Επεκτεινόμενο Τραπέζι", en: "Delta Extendable Rectangular Table" }, slug: "delta-extendable-table", category: "trapezia", price: 720, compareAtPrice: 890, materials: ["Δρυς", "Μέταλλο"], dimensions: { width: 180, height: 78, depth: 90, unit: "cm" }, featured: true,
      desc: { el: "Επεκτεινόμενο τραπέζι από μασίφ δρυ, ιδανικό για οικογενειακά γεύματα. Φιλοξενεί άνετα 6-8 άτομα.", en: "Extendable solid oak table, perfect for family meals. Comfortably seats 6-8 people." } },
    { name: { el: "Nova Κεραμικό Τραπέζι", en: "Nova Ceramic Table" }, slug: "nova-ceramic-table", category: "trapezia", price: 850, compareAtPrice: 1100, materials: ["Κεραμικό", "Μέταλλο"], dimensions: { width: 160, height: 76, depth: 90, unit: "cm" }, featured: false,
      desc: { el: "Εντυπωσιακό κεραμικό τραπέζι με μεταλλική βάση, ανθεκτικό στις γρατσουνιές και εύκολο στο καθάρισμα.", en: "Impressive ceramic table with metal base, scratch-resistant and easy to clean." } },

    // Καρέκλες
    { name: { el: "Elina Υφασμάτινη Καρέκλα", en: "Elina Upholstered Chair" }, slug: "elina-chair", category: "karekles", price: 180, compareAtPrice: 220, materials: ["Ύφασμα", "Ξύλο"], colors: [{ name: { el: "Γκρι", en: "Grey" }, hex: "#808080" }, { name: { el: "Μπεζ", en: "Beige" }, hex: "#D4C4A8" }], featured: true,
      desc: { el: "Άνετη υφασμάτινη καρέκλα με ξύλινη βάση. Σύγχρονος σχεδιασμός που ταιριάζει σε κάθε χώρο.", en: "Comfortable upholstered chair with wooden base. Modern design that fits any space." } },
    { name: { el: "Luna Δερμάτινη Καρέκλα", en: "Luna Leather Chair" }, slug: "luna-chair", category: "karekles", price: 210, compareAtPrice: 260, materials: ["PU Δέρμα", "Μέταλλο"], colors: [{ name: { el: "Λευκό", en: "White" }, hex: "#FFFFFF" }, { name: { el: "Μαύρο", en: "Black" }, hex: "#000000" }], featured: true,
      desc: { el: "Κομψή καρέκλα με επένδυση PU δέρματος και μεταλλικά πόδια. Ιδανική για τραπεζαρία ή γραφείο.", en: "Elegant chair with PU leather upholstery and metal legs. Ideal for dining room or office." } },
    { name: { el: "Rosa Ξύλινη Καρέκλα Οξιά", en: "Rosa Beech Wood Chair" }, slug: "rosa-chair", category: "karekles", price: 140, compareAtPrice: 170, materials: ["Οξιά"], featured: false,
      desc: { el: "Κλασική ξύλινη καρέκλα από μασίφ οξιά. Διαθέσιμη σε πολλά χρώματα.", en: "Classic wooden chair made of solid beech. Available in many colors." } },
    { name: { el: "Iris Καρέκλα Μπαρ", en: "Iris Bar Stool" }, slug: "iris-bar-stool", category: "karekles", price: 165, compareAtPrice: 200, materials: ["Ξύλο", "Μέταλλο"], featured: false,
      desc: { el: "Ψηλή καρέκλα μπαρ με ξύλινο κάθισμα και μεταλλική βάση. Ιδανική για κουζίνα ή μπαρ.", en: "High bar stool with wooden seat and metal base. Ideal for kitchen or bar." } },

    // Μπουφέδες (already exist, adding more)
    { name: { el: "Flora Μπουφές με 2 Πόρτες", en: "Flora Buffet with 2 Doors" }, slug: "flora-buffet", category: "mpoufes", price: 520, compareAtPrice: 650, materials: ["Ξύλο MDF", "Μέταλλο"], dimensions: { width: 120, height: 85, depth: 45, unit: "cm" }, featured: false,
      desc: { el: "Μοντέρνος μπουφές με δύο ντουλάπια και ρυθμιζόμενα ράφια. Ιδανικός για σαλόνι.", en: "Modern buffet with two cabinets and adjustable shelves. Ideal for living room." } },

    // Γραφεία
    { name: { el: "Woody Γραφείο Δρύινο", en: "Woody Oak Desk" }, slug: "woody-desk", category: "grafeia", price: 390, compareAtPrice: 480, materials: ["Δρυς", "Μέταλλο"], dimensions: { width: 122, height: 76, depth: 57, unit: "cm" }, featured: true,
      desc: { el: "Λιτό δρύινο γραφείο με καθαρές γραμμές. Ιδανικό για home office με στιλ.", en: "Minimal oak desk with clean lines. Perfect for a stylish home office." } },
    { name: { el: "Soho Γραφείο Λευκό", en: "Soho White Desk" }, slug: "soho-desk", category: "grafeia", price: 320, materials: ["MDF"], dimensions: { width: 140, height: 75, depth: 60, unit: "cm" }, featured: false,
      desc: { el: "Μοντέρνο λευκό γραφείο με αποθηκευτικό χώρο. Συμπαγές και λειτουργικό.", en: "Modern white desk with storage space. Compact and functional." } },

    // Τραπεζάκια
    { name: { el: "Cube Δρύινο Τραπεζάκι", en: "Cube Oak Coffee Table" }, slug: "cube-coffee-table", category: "trapezakia", price: 280, compareAtPrice: 350, materials: ["Δρυς"], dimensions: { width: 80, height: 40, depth: 80, unit: "cm" }, featured: true,
      desc: { el: "Μοντέρνο τετράγωνο τραπεζάκι από μασίφ δρυ. Κομψό και λειτουργικό.", en: "Modern square coffee table made of solid oak. Elegant and functional." } },
    { name: { el: "Nest Σετ 2 Τραπεζάκια", en: "Nest Set of 2 Tables" }, slug: "nest-tables", category: "trapezakia", price: 340, compareAtPrice: 420, materials: ["Ξύλο", "Γυαλί"], featured: false,
      desc: { el: "Σετ από δύο τραπεζάκια που χωράνε το ένα μέσα στο άλλο. Ιδανικά για μικρούς χώρους.", en: "Set of two nesting tables. Perfect for small spaces." } },

    // Βιβλιοθήκες
    { name: { el: "Henry Ψηλή Δρύινη Ραφιέρα", en: "Henry Tall Oak Bookcase" }, slug: "henry-bookshelf", category: "vivliothikes", price: 440, compareAtPrice: 550, materials: ["Δρυς"], dimensions: { width: 80, height: 200, depth: 35, unit: "cm" }, featured: true,
      desc: { el: "Ψηλή βιβλιοθήκη από μασίφ δρυ με 5 ράφια. Ιδανική για κάθε δωμάτιο.", en: "Tall bookcase made of solid oak with 5 shelves. Ideal for any room." } },

    // Διακόσμηση
    { name: { el: "Stone Κεραμικό Βάζο", en: "Stone Ceramic Vase" }, slug: "stone-vase", category: "diakosmisi", price: 45, materials: ["Κεραμικό"], featured: true,
      desc: { el: "Χειροποίητο κεραμικό βάζο με ματ φινίρισμα. Ιδανικό για μοντέρνα διακόσμηση.", en: "Handmade ceramic vase with matte finish. Ideal for modern decoration." } },
    { name: { el: "Linen Λινό Μαξιλάρι", en: "Linen Cushion" }, slug: "linen-cushion", category: "diakosmisi", price: 35, compareAtPrice: 45, materials: ["Λινό"], colors: [{ name: { el: "Φυσικό", en: "Natural" }, hex: "#E8DCC8" }, { name: { el: "Γκρι", en: "Grey" }, hex: "#A0998C" }], featured: false,
      desc: { el: "Μαξιλάρι από 100% λινό ύφασμα. Διακριτική κομψότητα για τον καναπέ σας.", en: "100% linen cushion. Discreet elegance for your sofa." } },
    { name: { el: "Amber Διακοσμητικό Μπολ", en: "Amber Decorative Bowl" }, slug: "amber-bowl", category: "diakosmisi", price: 28, materials: ["Γυαλί"], featured: false,
      desc: { el: "Γυάλινο διακοσμητικό μπολ χειροποίητο. Προσθέτει χρώμα και στυλ σε κάθε επιφάνεια.", en: "Handmade glass decorative bowl. Adds color and style to any surface." } },
  ];

  console.log("\n🏭 Δημιουργία προϊόντων...\n");

  for (const p of products) {
    console.log(`  ${p.name.el}...`);

    const asset = await uploadImage(p.name.el);
    const doc = {
      _type: "product",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      description: {
        _type: "blockContent",
        el: [{ _type: "block", style: "normal", children: [{ _type: "span", text: p.desc.el }] }],
        en: [{ _type: "block", style: "normal", children: [{ _type: "span", text: p.desc.en }] }],
      },
      images: [{ _type: "image", asset: { _type: "reference", _ref: asset._id } }],
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      category: { _type: "reference", _ref: catMap[p.category] },
      dimensions: p.dimensions,
      materials: p.materials,
      colors: p.colors,
      inStock: true,
      featured: p.featured || false,
    };

    const result = await client.create(doc);
    console.log(`  ✅ ${p.name.el} — ${p.price}€ (ID: ${result._id})\n`);
  }

  console.log("✨ Έτοιμο! Συνολικά προστέθηκαν:");
  console.log(`   - ${categories.length} κατηγορίες`);
  console.log(`   - ${products.length} προϊόντα`);
}

seed().catch(err => { console.error("❌", err); process.exit(1); });
