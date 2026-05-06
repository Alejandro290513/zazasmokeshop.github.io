import fs from 'fs';
import path from 'path';

const PRODUCTS_FILE = path.join(process.cwd(), 'src/data/products.json');

const encodingFixes = {
  // Corruptions commonly seen when UTF-8 bytes are read as Latin-1
  'Ã¡': 'á', 'Ã©': 'é', 'Ã­': 'í', 'Ã³': 'ó', 'Ãº': 'ú',
  'Ã': 'Á', 'Ã‰': 'É', 'Ã': 'Í', 'Ã“': 'Ó', 'Ãš': 'Ú',
  'Ã±': 'ñ', 'Ã‘': 'Ñ',
  'Ã¼': 'ü', 'Ãœ': 'Ü',
  // Specific cases found
  'orgÃ¡nico': 'orgánico',
  'lÃ­nea': 'línea',
  'lÃ­quido': 'líquido',
  'cÃ¡psula': 'cápsula',
  'extracciÃ³n': 'extracción',
  'mÃ¡xima': 'máxima',
  'mÃ¡s': 'más',
  'fÃ³rmula': 'fórmula',
  'Ãºnica': 'única',
  'relaciÃ³n': 'relación',
  'cÃ³smico': 'cósmico',
  'concentraciÃ³n': 'concentración',
  'PresentaciÃ³n': 'Presentación',
  'TÃ©': 'Té',
  'dinÃ¡mica': 'dinámica',
  'instantÃ¡neo': 'instantáneo',
  'cáñamo': 'cáñamo',
  'VacÃ­as': 'Vacías',
  'vacÃ­as': 'vacías',
  'mayorÃ­a': 'mayoría',
  'terpÃ©nico': 'terpénico',
  'diÃ¡metros': 'diamantes',
  'inhalaciÃ³n': 'inhalación',
  'portÃ¡til': 'portátil',
  'estÃ¡ndar': 'estándar',
  'difusiÃ³n': 'difusión',
  'cuchillo': 'cuchillo',
  'fÃ³rmula': 'fórmula',
  // Emojis/Symbols
  'ðŸ’š': '💚', 'ðŸ’‰': '💉', 'ðŸ‡ºðŸ‡¸': '🇺🇸', 'ðŸ”¥': '🔥', 'ðŸ‘‘': '👑', 'ðŸ’œ': '💜', 'ðŸ ‹': '🍪', 'ðŸ ¬': '🍬', 'ðŸŒ²': '🌲', 'ðŸ’Š': '💊', 'ðŸ”¦': '🔦', 'âš¡': '⚡', 'ðŸ’¡': '💡', 'ðŸ”‹': '🔋', 'ðŸ•µï¸ ': '🕵️', 'â™ˆ': '♈', 'ðŸ”¢': '📟', 'ðŸ›¡ï¸ ': '🛡️', 'ðŸ’Ž': '💎', 'ðŸŸ¡': '🟨', 'ðŸŒŸ': '🌟', 'ðŸ§°': '🏺', 'âš”ï¸ ': '⚔️', 'âœ¨': '✨', 'ðŸŒº': '🌺', 'ðŸ’§': '💧', 'ðŸ‘»': '👻', 'ðŸ  ': '🐐', 'ðŸ¥Š': '🥊', 'ðŸŒ´': '🌴', 'ðŸ ©': '🚬', 'ðŸ’¥': '💥', 'ðŸ º': '🐻', 'ðŸ ª': '🍪', 'ðŸ’ª': '💪', 'ðŸ µ': '🍵', 'ðŸ ¯': '🍯', 'ðŸŒ¸': '🌸', 'ðŸ‘ ï¸ ': '👁️', 'ðŸ“œ': '📜', 'ðŸ“¦': '📦', 'â­•': '⚫',
};

function fixEncoding(text) {
  if (typeof text !== 'string') return text;
  let fixed = text;
  for (const [wrong, correct] of Object.entries(encodingFixes)) {
    fixed = fixed.replaceAll(wrong, correct);
  }
  return fixed;
}

function fixObjectEncoding(obj) {
  if (typeof obj === 'string') return fixEncoding(obj);
  if (Array.isArray(obj)) return obj.map(fixObjectEncoding);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, fixObjectEncoding(v)])
    );
  }
  return obj;
}

try {
  console.log('🔧 Preparando datos para build...');
  
  if (!fs.existsSync(PRODUCTS_FILE)) {
    console.error(`❌ Archivo no encontrado: ${PRODUCTS_FILE}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  const products = JSON.parse(rawData);
  const fixedProducts = fixObjectEncoding(products);

  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(fixedProducts, null, 2), 'utf8');
  console.log('✅ Datos listos para build');
} catch (error) {
  console.error('❌ Error durante la preparación del build:', error.message);
  process.exit(1);
}
