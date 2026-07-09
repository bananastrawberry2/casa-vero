// Seed a proper blog post - practical buying guide, no fluff
// Run: cd C:\Users\User\furniture-shop && node scripts/seed-blog.mjs

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

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

async function uploadImage(url, name) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return client.assets.upload("image", buf, { filename: `${name}.jpg`, contentType: "image/jpeg" });
}

async function run() {
  console.log("📝 Δημοσίευση blog post...\n");

  // Upload cover image
  const imgUrl = "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=1200&h=600&fit=crop";
  const asset = await uploadImage(imgUrl, "dining-table-guide");
  console.log("   ✅ Cover image uploaded\n");

  const doc = {
    _type: "blog",
    title: {
      el: "Πώς να επιλέξεις το σωστό τραπέζι φαγητού για το σπίτι σου",
      en: "How to Choose the Right Dining Table for Your Home"
    },
    slug: { _type: "slug", current: "pos-na-epilekseis-trapezi-fagitou" },
    excerpt: {
      el: "Από το μέγεθος και το σχήμα μέχρι τα υλικά και τον προϋπολογισμό — όλα όσα πρέπει να ξέρεις πριν αγοράσεις τραπέζι φαγητού.",
      en: "From size and shape to materials and budget — everything you need to know before buying a dining table."
    },
    coverImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
    publishedAt: new Date().toISOString(),
    tags: ["τραπέζια", "οδηγός αγορών", "τραπεζαρία", "έπιπλα"],
    seo: {
      _type: "seo",
      title: "Πώς να διαλέξεις τραπέζι φαγητού | Οδηγός Αγορών | Casa Vero",
      description: "Οδηγός για την επιλογή του κατάλληλου τραπεζιού φαγητού. Μάθε για σχήματα, υλικά, διαστάσεις και χρήσιμες συμβουλές πριν την αγορά σου."
    },
    content: {
      el: [
        { _type: "block", style: "h2", children: [{ _type: "span", text: "Γιατί έχει σημασία η σωστή επιλογή" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Το τραπέζι φαγητού είναι το κεντρικό έπιπλο κάθε σπιτιού. Εκεί τρώμε, δουλεύουμε, διαβάζουμε, μαζευόμαστε με φίλους και οικογένεια. Μια λάθος επιλογή μπορεί να κάνει τον χώρο σου μη λειτουργικό. Ένα σωστό τραπέζι, από την άλλη, μπορεί να αναβαθμίσει όλο το δωμάτιο." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Σε αυτόν τον οδηγό θα δούμε αναλυτικά τι πρέπει να προσέξεις πριν αγοράσεις τραπέζι φαγητού, από το σχήμα και το μέγεθος μέχρι τα υλικά και τη συντήρηση." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "1. Μέτρησε τον χώρο σου" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Πριν κοιτάξεις οτιδήποτε άλλο, μέτρησε τον διαθέσιμο χώρο. Ο βασικός κανόνας: το τραπέζι πρέπει να απέχει τουλάχιστον 90 εκατοστά από κάθε τοίχο ή έπιπλο, για να μπορούν να καθίσουν άνετα οι καρέκλες και να κινείται κάποιος πίσω τους." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Για ένα δωμάτιο 4x4 μέτρων, ένα τραπέζι 160x90 εκατοστών είναι η ιδανική επιλογή. Για μικρότερους χώρους, ένα στρογγυλό τραπέζι διαμέτρου 100-120 εκατοστών εξυπηρετεί τέλεια 4-6 άτομα." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "2. Σχήμα: Στρογγυλό, ορθογώνιο ή τετράγωνο;" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Το σχήμα του τραπεζιού καθορίζει τη λειτουργικότητα και την αίσθηση του χώρου:" }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Ορθογώνιο — Η πιο συνηθισμένη επιλογή. Χωράει πολλά άτομα, ταιριάζει σε μακρόστενα δωμάτια και είναι ιδανικό για επίσημα γεύματα. Μειονέκτημα: οι άκρες μπορεί να είναι άβολες." }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Στρογγυλό — Ιδανικό για μικρούς χώρους και τετράγωνα δωμάτια. Δημιουργεί πιο ζεστή, ισότιμη ατμόσφαιρα γιατί όλοι βλέπονται. Χωράει λιγότερα άτομα από ένα ορθογώνιο ίδιων διαστάσεων." }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Τετράγωνο — Μοντέρνο και συμμετρικό. Ιδανικό για μικρές οικογένειες. Μπορεί να τοποθετηθεί και στη γωνία." }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Οβάλ — Συνδυάζει τα πλεονεκτήματα του ορθογώνιου και του στρογγυλού. Δεν έχει αιχμηρές γωνίες και χωράει πολλά άτομα." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "3. Υλικά: Κάθε επιλογή έχει τα πλεονεκτήματά της" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Το υλικό του τραπεζιού καθορίζει την εμφάνιση, την αντοχή και το κόστος:" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Μασίφ ξύλο. Είναι η κλασική επιλογή για τραπέζι φαγητού. Ανθεκτικό, ζεστό, μπορεί να ανακαινιστεί και διαρκεί για δεκαετίες. Δρυς, καρυδιά, οξιά και φλαμουριά είναι οι πιο δημοφιλείς επιλογές. Το μασίφ ξύλο είναι πιο ακριβό αλλά αξίζει σαν επένδυση." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "MDF/Laminato. Πιο οικονομική επιλογή, με μεγάλη ποικιλία χρωμάτων και φινιρισμάτων. Είναι ανθεκτικό στη χρήση αλλά δεν μπορεί να ανακαινιστεί όπως το μασίφ ξύλο." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Γυαλί. Δημιουργεί αίσθηση ευρυχωρίας και ταιριάζει σε μοντέρνους χώρους. Θέλει συχνό καθάρισμα και είναι πιο ευαίσθητο σε γρατσουνιές." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Μέταλλο. Βιομηχανικό στιλ, πολύ ανθεκτικό, ιδανικό για μοντέρνους και μινιμαλιστικούς χώρους." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "4. Επεκτεινόμενο ή σταθερό;" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Αν φιλοξενείς συχνά κόσμο, ένα επεκτεινόμενο τραπέζι είναι η καλύτερη λύση. Τα περισσότερα επεκτεινόμενα τραπέζια κρύβουν μηχανισμό που επιτρέπει να αυξήσεις το μήκος κατά 40-60 εκατοστά, φιλοξενώντας 2-4 επιπλέον άτομα." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Στην Casa Vero έχουμε επιλέξει επεκτεινόμενα τραπέζια που συνδυάζουν λειτουργικότητα και αισθητική, όπως το Delta Ορθογώνιο Επεκτεινόμενο που φιλοξενεί άνετα 6-8 άτομα." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "5. Συμβουλές για μακροζωία" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Για να διατηρήσεις το τραπέζι σου σε καλή κατάσταση για χρόνια:" }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Χρησιμοποίησε σουβέρ και επιτραπέζια σκεύη. Η ζέστη και η υγρασία είναι οι μεγαλύτεροι εχθροί του ξύλου." }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Καθάρισε με μαλακό πανί και ειδικά προϊόντα για ξύλο. Απέφυγε δυνατά καθαριστικά." }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Γέμισε μικρές γρατσουνιές με ειδικό στόκο για έπιπλα ή κερί." }] },
        { _type: "block", style: "bullet", children: [{ _type: "span", text: "Τοποθέτησε το τραπέζι μακριά από καλοριφέρ και άμεση ηλιακή ακτινοβολία για να αποφύγεις παραμορφώσεις." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "Συμπέρασμα" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Η επιλογή τραπεζιού φαγητού είναι επένδυση. Δεν χρειάζεται να είναι το πιο ακριβό, αλλά πρέπει να ταιριάζει στις ανάγκες σου. Μέτρησε τον χώρο σου, σκέψου πόσα άτομα φιλοξενείς συνήθως, και διάλεξε υλικό που ταιριάζει στο στιλ σου." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Στη συλλογή της Casa Vero θα βρεις τραπέζια για κάθε γούστο και ανάγκη — από μοντέρνα δρύινα μέχρι κεραμικά και επεκτεινόμενα. Δες τη συλλογή μας και βρες αυτό που σου ταιριάζει." }] },

        { _type: "block", style: "normal", children: [{ _type: "span", text: "Εικόνα header: Unsplash" }] },
      ],
      en: [
        { _type: "block", style: "h2", children: [{ _type: "span", text: "Why Choosing the Right Dining Table Matters" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "The dining table is the centerpiece of every home. It's where you eat, work, read, and gather with friends and family. A wrong choice can make your space impractical. A good table, on the other hand, can elevate the entire room." }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "In this guide, we'll cover everything you need to know before buying a dining table — from size and shape to materials and maintenance." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "1. Measure Your Space" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Before anything else, measure your available space. The basic rule: your table should be at least 90 cm from any wall or furniture, allowing chairs to slide out comfortably and someone to walk behind them." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "2. Shape: Round, Rectangular or Square?" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Rectangular tables are the most common. They fit many people and work well in long rooms. Round tables are ideal for small spaces and create a warmer atmosphere. Square tables feel modern and work for small families." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "3. Materials" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Solid wood is the classic choice — durable, warm, and long-lasting. Oak and walnut are the most popular. MDF/Laminate is more affordable with many color options. Glass creates a sense of space but requires frequent cleaning. Metal offers an industrial look and high durability." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "4. Extendable or Fixed?" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "If you host guests often, an extendable table is the best solution. Most extendable tables can add 40-60 cm of length, seating 2-4 extra people." }] },

        { _type: "block", style: "h2", children: [{ _type: "span", text: "Summary" }] },
        { _type: "block", style: "normal", children: [{ _type: "span", text: "Choosing a dining table is an investment. Measure your space, think about how many people you host, and pick a material that fits your style. At Casa Vero you'll find tables for every taste and need." }] },
      ],
    },
  };

  const result = await client.create(doc);
  console.log(`   ✅ Blog post created! ID: ${result._id}`);
  console.log(`   📍 https://casa-vero-vrp3.vercel.app/el/blog/pos-na-epilekseis-trapezi-fagitou`);
}

run().catch(e => { console.error(e); process.exit(1); });
