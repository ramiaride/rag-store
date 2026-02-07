import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const repoRoot = process.cwd();
const mainPagePath = path.join(repoRoot, 'src', 'components', 'MainPage.jsx');
const outDir = path.join(repoRoot, 'src', 'products');

const src = fs.readFileSync(mainPagePath, 'utf8');

// 1) Map import variable -> asset relative path under Assets/
const importRe = /import\s+(\w+)\s+from\s+"\.\.\/Assets\/([^"]+)";/g;
const importVarToAsset = new Map();
for (const match of src.matchAll(importRe)) {
  importVarToAsset.set(match[1], match[2]);
}

// 2) Map productImageX -> asset path
const productImageRe = /const\s+(productImage\d*)\s*=\s*`url\(\$\{(\w+)\}\)`;/g;
const productImageToAsset = new Map();
for (const match of src.matchAll(productImageRe)) {
  const productImageName = match[1];
  const varName = match[2];
  const asset = importVarToAsset.get(varName);
  if (asset) productImageToAsset.set(productImageName, asset);
}

// 3) Extract the products array literal inside useMemo
const productsBlockRe =
  /const\s+products\s*=\s*useMemo\(\s*\(\)\s*=>\s*\[(?<body>[\s\S]*?)\]\s*,\s*\[productImage\]\s*,?\s*\)\s*;?/m;
const blockMatch = src.match(productsBlockRe);
if (!blockMatch?.groups?.body) {
  throw new Error('Could not locate products useMemo array in MainPage.jsx');
}
const arrayLiteral = `[${blockMatch.groups.body}]`;

// 4) Evaluate the array literal in a sandbox, defining productImage vars as asset paths
const sandbox = {};
for (const [k, v] of productImageToAsset.entries()) sandbox[k] = v;

let products;
try {
  products = vm.runInNewContext(`(${arrayLiteral})`, sandbox, { timeout: 2000 });
} catch (err) {
  console.error('Failed to evaluate products array.');
  throw err;
}

if (!Array.isArray(products)) throw new Error('Evaluated products is not an array');

// 5) Group by categoryId
const byCategory = new Map();
for (const p of products) {
  const categoryId = p?.categoryId;
  if (!categoryId) continue;
  if (!byCategory.has(categoryId)) byCategory.set(categoryId, []);
  byCategory.get(categoryId).push(p);
}

// 6) Write one JSON file per category
// Normalize: store imagePath instead of `image`, and add details.description.
for (const [categoryId, items] of byCategory.entries()) {
  const normalized = items.map((p) => {
    const imagePath = typeof p.image === 'string' ? p.image : undefined;
    const { image, ...rest } = p;
    return {
      ...rest,
      imagePath,
      details: {
        description: '',
      },
    };
  });

  const outPath = path.join(outDir, `${categoryId}.json`);
  fs.writeFileSync(outPath, JSON.stringify(normalized, null, 2) + '\n', 'utf8');
}

// Create empty JSON files for any known categories not present in products
const known = [
  'valentine',
  'personalized',
  'home-decor',
  'jewelry',
  'accessories',
  'ramadan',
  'games',
  'wall-art',
  'kitchen',
  'coffee',
  'kids',
  'lights',
  'family',
  'friends',
  'pet',
  'shops',
  'storage',
  'books'
];
for (const cat of known) {
  const outPath = path.join(outDir, `${cat}.json`);
  if (!fs.existsSync(outPath)) {
    fs.writeFileSync(outPath, '[]\n', 'utf8');
  }
}

console.log(`Wrote ${byCategory.size} category JSON files to src/products`);
