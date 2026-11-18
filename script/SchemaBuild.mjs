/** Builds the gateway JSON schema from this package's declarations and its hardening table. */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

/** Constraint keywords the hardening table may add; it can never remove one. */
const CONSTRAINTS = new Set([
    'pattern',
    'minLength',
    'maxLength',
    'minimum',
    'maximum',
    'minItems',
    'maxItems',
    'additionalProperties',
    'type',
    'enum',
    'required',
]);

/** Runs typescript-json-schema over the contract root with this package's compiler options. */
export function declarationsSchema(root) {
    const temporary = mkdtempSync(join(tmpdir(), 'nexa-protocol-schema-'));
    try {
        const configuration = join(temporary, 'tsconfig.json');
        const output = join(temporary, 'schema.json');
        writeFileSync(
            configuration,
            JSON.stringify({
                extends: join(root, 'tsconfig.json'),
                compilerOptions: { noUnusedLocals: false, noUnusedParameters: false },
                files: [join(root, 'script/Contract.ts')],
                include: [],
            }),
        );
        execFileSync(
            join(root, 'node_modules/.bin/typescript-json-schema'),
            [configuration, 'Contract', '--strictNullChecks', '--required', '--out', output],
            { stdio: 'inherit' },
        );
        return JSON.parse(readFileSync(output, 'utf8'));
    } finally {
        rmSync(temporary, { recursive: true, force: true });
    }
}

/** Decodes a `#/definitions/` reference into its definition name. */
export function definitionName(reference) {
    return decodeURIComponent(reference.replace('#/definitions/', ''))
        .replaceAll('~1', '/')
        .replaceAll('~0', '~');
}

/** Shapes the generator output into the form the runtime validator reads. */
export function normalize(schema) {
    const definitions = schema.definitions;
    /** Named method interfaces keep the same validator paths as inline method declarations. */
    for (const [name, method] of Object.entries(definitions.GatewayMethods.properties)) {
        let contract = method;
        const visited = new Set();
        while (contract.$ref !== undefined) {
            if (visited.has(contract.$ref))
                throw new Error('Cyclic gateway method declaration: ' + name);
            visited.add(contract.$ref);
            contract = definitions[definitionName(contract.$ref)];
            if (contract === undefined)
                throw new Error('Missing gateway method declaration: ' + name);
        }
        if (
            contract.properties?.params === undefined ||
            contract.properties?.result === undefined
        ) {
            throw new Error('Incomplete gateway method declaration: ' + name);
        }
        definitions.GatewayMethods.properties[name] = structuredClone(contract);
    }
    /** Arbitrary JSON fields stay fully typed and structurally validated. */
    definitions.JsonValue = {
        anyOf: [
            { type: 'null' },
            { type: 'boolean' },
            { type: 'string' },
            { type: 'number' },
            { type: 'array', items: { $ref: '#/definitions/JsonValue' } },
            { type: 'object', additionalProperties: { $ref: '#/definitions/JsonValue' } },
        ],
    };
    /** The native history payload is private binary transport state, never a JSON response field. */
    delete definitions.SessionHistoryPage.properties.payload;
    /** An empty schema is an open JSON value. */
    function openValues(node) {
        if (Array.isArray(node)) {
            node.forEach(openValues);
            return;
        }
        if (!node || typeof node !== 'object') return;
        if (Object.keys(node).length === 0) {
            node.$ref = '#/definitions/JsonValue';
            return;
        }
        for (const value of Object.values(node)) openValues(value);
    }
    for (const definition of Object.values(definitions)) openValues(definition);
    /**
     * Union members that render to the same JSON shape, such as a binary view and the byte array it serializes to,
     * are one branch.
     */
    function collapseUnions(node) {
        if (Array.isArray(node)) {
            node.forEach(collapseUnions);
            return;
        }
        if (!node || typeof node !== 'object') return;
        for (const value of Object.values(node)) collapseUnions(value);
        if (!Array.isArray(node.anyOf)) return;
        const branches = node.anyOf.filter(
            (branch, index) => node.anyOf.findIndex((other) => isDeepStrictEqual(other, branch)) === index,
        );
        if (branches.length === 1) {
            delete node.anyOf;
            Object.assign(node, branches[0]);
        } else {
            node.anyOf = branches;
        }
    }
    for (const definition of Object.values(definitions)) collapseUnions(definition);
    /** Mapped dictionaries the schema generator leaves unexpanded keep their value type. */
    for (const [name, definition] of Object.entries(definitions)) {
        if (!name.startsWith('Record<string,')) continue;
        const value = name.slice(14, -1);
        definition.additionalProperties =
            value === 'never'
                ? false
                : value === 'Scope'
                  ? { $ref: '#/definitions/Scope' }
                  : value === 'unknown' || value === 'JsonValue'
                    ? { $ref: '#/definitions/JsonValue' }
                    : value.includes('|')
                      ? { anyOf: value.split('|').map((type) => ({ type })) }
                      : { type: value };
    }
    return schema;
}

/** Resolves a slash-separated path inside a definition; an empty path is the definition itself. */
export function locate(definition, path, label) {
    let node = definition;
    for (const part of path === '' ? [] : path.split('/')) {
        node = node?.[part];
        if (node === undefined || node === null || typeof node !== 'object') {
            throw new Error('Hardening target is missing: ' + label);
        }
    }
    return node;
}

/**
 * Applies the hardening table: limits, patterns, integer types and closed shapes the declarations cannot express.
 * An entry may tighten a generated constraint but never weaken or silently replace one.
 */
export function harden(schema, table) {
    for (const [name, entries] of Object.entries(table)) {
        const definition = schema.definitions[name];
        if (definition === undefined)
            throw new Error('Hardening names a missing definition: ' + name);
        for (const [path, constraints] of Object.entries(entries)) {
            const label = name + (path ? '/' + path : '');
            const node = locate(definition, path, label);
            for (const [keyword, value] of Object.entries(constraints)) {
                if (!CONSTRAINTS.has(keyword))
                    throw new Error('Unsupported hardening keyword ' + keyword + ' at ' + label);
                const current = node[keyword];
                if (keyword === 'type') {
                    if (value !== 'integer' || current !== 'number')
                        throw new Error('Only number may narrow to integer at ' + label);
                } else if (keyword === 'enum') {
                    if (
                        !Array.isArray(current) ||
                        !isDeepStrictEqual([...current].sort(), [...value].sort())
                    ) {
                        throw new Error('An enum order must keep the declared values at ' + label);
                    }
                } else if (keyword === 'required') {
                    if (
                        !Array.isArray(current) ||
                        !isDeepStrictEqual([...current].sort(), [...value].sort())
                    ) {
                        throw new Error(
                            'A required order must keep the declared fields at ' + label,
                        );
                    }
                } else if (keyword === 'additionalProperties') {
                    if (value !== false || (current !== undefined && current !== false)) {
                        throw new Error('Hardening can only close an open shape at ' + label);
                    }
                } else if (current !== undefined && current !== value) {
                    throw new Error('Hardening would replace ' + keyword + ' at ' + label);
                }
                node[keyword] = value;
            }
        }
    }
    return schema;
}

/** The complete generated schema of the package rooted at `root`. */
export function buildSchema(root) {
    const table = JSON.parse(readFileSync(join(root, 'script/hardening.json'), 'utf8'));
    return harden(normalize(declarationsSchema(root)), table.constraints);
}
