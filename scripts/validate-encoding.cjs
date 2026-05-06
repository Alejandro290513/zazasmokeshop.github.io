const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src/data/products.json');
const data = fs.readFileSync(filePath, 'utf8');

// Regex to detect common mojibake characters
const hasErrors = /Ã[¡©­³º]|â€|â\$/.test(data);

if (hasErrors) {
  console.error('❌ Se detectaron problemas de encoding en products.json');
  process.exit(1);
}
console.log('✅ Encoding válido');
