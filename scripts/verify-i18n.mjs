import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const enPath = path.join(rootDir, 'src', 'i18n', 'en-US.ts');
const ptPath = path.join(rootDir, 'src', 'i18n', 'pt-BR.ts');

function parseTsLocaleObject(filePath, varName) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const cleaned = raw
    .replace(/^import\s+.*$/gm, '')
    .replace(/^export\s+type\s+.*$/gm, '')
    .replace(/^export\s+default\s+.*$/gm, '')
    .replace(new RegExp(`const\\s+${varName}\\s*(?::\\s*[A-Za-z0-9_<>]+)?\\s*=`), 'const result =');
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(`${cleaned}\n;globalThis.__out = result;`, ctx);
  return ctx.__out;
}

function flattenKeys(obj, prefix = '', out = new Map()) {
  for (const [k, v] of Object.entries(obj)) {
    const keyPath = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flattenKeys(v, keyPath, out);
    } else {
      out.set(keyPath, v);
    }
  }
  return out;
}

const enObj = parseTsLocaleObject(enPath, 'enUS');
const ptObj = parseTsLocaleObject(ptPath, 'ptBR');

const enMap = flattenKeys(enObj);
const ptMap = flattenKeys(ptObj);

const errors = [];

for (const [k, enVal] of enMap.entries()) {
  if (!ptMap.has(k)) {
    errors.push(`Missing key in pt-BR: ${k}`);
    continue;
  }
  const ptVal = ptMap.get(k);
  if (typeof enVal !== 'string' || enVal.trim().length === 0) {
    errors.push(`Empty or non-string value in en-US at ${k}`);
  }
  if (typeof ptVal !== 'string' || ptVal.trim().length === 0) {
    errors.push(`Empty or non-string value in pt-BR at ${k}`);
  }
  const enPlaceholders = (String(enVal).match(/\{[a-zA-Z0-9_]+\}/g) || []).sort().join(',');
  const ptPlaceholders = (String(ptVal).match(/\{[a-zA-Z0-9_]+\}/g) || []).sort().join(',');
  if (enPlaceholders !== ptPlaceholders) {
    errors.push(`Placeholder mismatch at ${k}: en-US (${enPlaceholders}) vs pt-BR (${ptPlaceholders})`);
  }
}

for (const k of ptMap.keys()) {
  if (!enMap.has(k)) {
    errors.push(`Extra key in pt-BR not present in en-US: ${k}`);
  }
}

if (errors.length > 0) {
  console.error(`i18n parity check FAILED (${errors.length} error(s)):`);
  for (const err of errors) console.error(`  - ${err}`);
  process.exit(1);
}

console.log(`PASS: i18n parity check succeeded (${enMap.size} keys verified across en-US and pt-BR).`);

