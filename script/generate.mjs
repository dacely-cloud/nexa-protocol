/**
 * Generates the gateway schema, its validators, the method catalog and the protocol reference from this
 * package's own type declarations. It reads no other repository.
 *
 * Usage: `node script/generate.mjs` rewrites the generated files; `node script/generate.mjs --check` fails when any
 * of them differs from what the declarations produce.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSchema } from './SchemaBuild.mjs';
import { Documents } from './Documents.mjs';
import { ValidatorSources } from './ValidatorSources.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.slice(2).includes('--check');
if (process.argv.slice(2).some((value) => value !== '--check')) {
    throw new Error('Unsupported generation option');
}

const schema = buildSchema(root);
const outputs = new Map([
    ['src/schema/SchemaData.ts', ValidatorSources.schemaData(schema)],
    ['src/schema/Validators.ts', ValidatorSources.validators(schema)],
    ['src/schema/MethodValidators.ts', ValidatorSources.methodValidators(schema)],
    ['src/gateway/Method.ts', ValidatorSources.methods(schema)],
    ['docs/methods.md', Documents.methods(schema)],
    ['docs/protocol.md', Documents.protocol(schema)],
]);
const formatted = new Map();
const temporary = mkdtempSync(join(root, '.generate-'));
try {
    for (const [path, text] of outputs) {
        const file = join(temporary, path.replaceAll('/', '_'));
        writeFileSync(file, text);
        execFileSync(
            join(root, 'node_modules/.bin/prettier'),
            ['--write', '--log-level', 'warn', file],
            { stdio: 'inherit' },
        );
        formatted.set(path, readFileSync(file, 'utf8'));
    }
} finally {
    rmSync(temporary, { recursive: true, force: true });
}
const stale = [];
for (const [path, text] of formatted) {
    const target = join(root, path);
    let current = null;
    try {
        current = readFileSync(target, 'utf8');
    } catch {
        current = null;
    }
    if (current === text) continue;
    stale.push(path);
    if (!check) writeFileSync(target, text);
}
const methods = Object.keys(schema.definitions.GatewayMethods.properties).length;
if (check && stale.length > 0)
    throw new Error('Generated files are out of date: ' + stale.join(', '));
console.log(
    `${check ? 'Checked' : 'Generated'} ${methods} gateway methods and ${Object.keys(schema.definitions).length} definitions.`,
);
