/** Emits the method and type reference documents from the gateway schema. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** The module that declares each exported name under src/. */
function declaringModules() {
    const modules = new Map();
    const visit = (directory) => {
        for (const entry of readdirSync(directory)) {
            const path = join(directory, entry);
            if (statSync(path).isDirectory()) {
                visit(path);
                continue;
            }
            if (!path.endsWith('.ts')) continue;
            const module =
                'nexa-protocol/' + relative(join(root, 'src'), path).replace(/\.ts$/u, '.js');
            const source = readFileSync(path, 'utf8');
            for (const match of source.matchAll(/^export (?:interface|type|const|enum) (\w+)/gmu)) {
                if (!modules.has(match[1])) modules.set(match[1], module);
            }
        }
    };
    visit(join(root, 'src'));
    return modules;
}

/** Readable unique anchors for definition names, including generic instantiations. */
function definitionNames(definitions) {
    const names = new Map();
    const used = new Set();
    for (const name of Object.keys(definitions)) {
        const clean = name.replace(/[^a-zA-Z0-9_]/gu, '');
        let unique = clean;
        let index = 2;
        while (used.has(unique)) unique = `${clean}${index++}`;
        used.add(unique);
        names.set(name, unique);
    }
    return names;
}

/** Document generators. */
export class Documents {
    /** The RPC reference: one section per gateway method with a typed call template. */
    static methods(schema) {
        const context = Documents.#context(schema);
        const methods = schema.definitions.GatewayMethods.properties;
        const count = Object.keys(methods).length;
        let text =
            `# RPC reference\n\nAll ${count} gateway methods. \`connect\` is managed by \`NexaClient.connect\` in nexa-transport; ` +
            `the remaining ${count - 1} use \`client.call(Method.Name, params)\`. The method catalog is ` +
            '`nexa-protocol/gateway/Method.js` and the parameter and result types come from `nexa-protocol/gateway/ProtocolTypes.js`. ' +
            'Examples are independent templates; replace identifiers and values before calling. Administrative and destructive ' +
            'methods change server state. Availability depends on the authenticated identity, scopes, and server policy.\n\n';
        text += Object.keys(methods)
            .map((name) => `- [${name}](#${name.replaceAll('.', '').toLowerCase()})`)
            .join('\n');
        text += '\n\n';
        for (const [name, entry] of Object.entries(methods)) {
            const { params, result } = entry.properties;
            const connectorEnums =
                name === 'connectors.execution.submit' || name === 'connectors.execution.cancel';
            let source = JSON.stringify(Documents.#example(context, name, params), null, 4);
            if (connectorEnums) {
                source = source
                    .replace(/"lane": "first"/gu, '"lane": ConnectorExecutionLane.First')
                    .replace(
                        /"workspaceAccess": "read-only"/gu,
                        '"workspaceAccess": ConnectorExecutionAccess.ReadOnly',
                    );
            }
            text += `## ${name}\n\n`;
            if (name === 'connect') {
                text +=
                    'Use `await NexaClient.connect({ url, apiKey })` from nexa-transport; the SDK handles challenge, protocol ' +
                    'negotiation, and authentication. Do not call `Method.Connect` yourself.\n\n';
            } else {
                const key = name
                    .split(/[.-]/u)
                    .map((part) => part[0].toUpperCase() + part.slice(1))
                    .join('');
                text +=
                    '```ts\n' +
                    (connectorEnums
                        ? "import { ConnectorExecutionAccess, ConnectorExecutionLane } from 'nexa-protocol/dataplane/ConnectorExecutionTypes.js';\n"
                        : '') +
                    "import { Method } from 'nexa-protocol/gateway/Method.js';\n" +
                    "import type { ParamsOf, ResultOf } from 'nexa-protocol/gateway/ProtocolTypes.js';\n\n" +
                    `const params: ParamsOf<typeof Method.${key}> = ${source};\n` +
                    `const result: ResultOf<typeof Method.${key}> = await client.call(Method.${key}, params);\n` +
                    '```\n\n';
            }
            if (name === 'agent.ask' || name === 'agent.stream') {
                text +=
                    'With a personal API key, omit `userId`; the gateway uses the authenticated identity. A display name such ' +
                    'as `Ralph` is not the internal principal `user:ralph`.\n\n';
            }
            if (name === 'design.layout.preview') {
                text +=
                    'Requires an advertised read capability, a current saved revision and a matching page. Start with ' +
                    '`action: "canvas"`, `key: null` and `cursor: null`. Reuse the returned key with the same canonical ' +
                    'operation for canvas continuations, metrics and visible glyph windows. Previews do not save a revision or ' +
                    'hydrate deferred source text.\n\n';
            }
            text += `Parameters: ${Documents.#type(context, params)}.\n\n${Documents.#fields(context, params)}\n`;
            text += `Result: ${Documents.#type(context, result)}.\n\n`;
        }
        return text;
    }

    /** The type reference: every schema definition with its fields and declaring module. */
    static protocol(schema) {
        const context = Documents.#context(schema);
        let text =
            '# Protocol types\n\nField reference generated from the gateway schema. Optional fields may be absent. Union ' +
            'variants list their own required fields. Each named type is imported from the nexa-protocol module listed under ' +
            'its heading. See the [RPC reference](methods.md).\n\n';
        for (const [name, node] of Object.entries(schema.definitions)) {
            text += `## ${context.names.get(name)}\n\n`;
            const module = context.modules.get(name);
            if (module !== undefined) text += `Module: \`${module}\`.\n\n`;
            const summary = Documents.#description(node);
            if (summary) text += `${summary}\n\n`;
            if (node.anyOf || node.oneOf) {
                for (const [index, variant] of (node.anyOf ?? node.oneOf).entries()) {
                    text += `Variant ${index + 1}: ${Documents.#type(context, variant)}\n\n${Documents.#fields(context, variant)}\n`;
                }
            } else {
                text += Documents.#fields(context, node) + '\n';
            }
            text += Documents.#nested(context, node);
        }
        return text;
    }

    static #context(schema) {
        return {
            definitions: schema.definitions,
            names: definitionNames(schema.definitions),
            modules: declaringModules(),
        };
    }

    static #reference(reference) {
        return decodeURIComponent(reference.split('/').at(-1));
    }

    static #description(node) {
        return (node.description ?? '').split('\n')[0].replace(/\|/gu, '\\|');
    }

    static #type(context, node) {
        if (node.$ref) {
            const name = Documents.#reference(node.$ref);
            const clean = context.names.get(name);
            return `[${clean}](protocol.md#${clean.toLowerCase()})`;
        }
        if (node.const !== undefined) return `\`${JSON.stringify(node.const)}\``;
        if (node.enum) return node.enum.map((value) => `\`${JSON.stringify(value)}\``).join(' / ');
        if (node.anyOf || node.oneOf)
            return (node.anyOf ?? node.oneOf)
                .map((item) => Documents.#type(context, item))
                .join(' / ');
        if (node.type === 'array') return `Array of ${Documents.#type(context, node.items)}`;
        if (node.type === 'object') return node.properties ? 'Object (fields below)' : 'Dictionary';
        return `\`${node.type ?? 'JSON'}\``;
    }

    static #resolved(context, node) {
        return node.$ref ? context.definitions[Documents.#reference(node.$ref)] : node;
    }

    static #fields(context, input) {
        const node = Documents.#resolved(context, input);
        if (!node.properties) return `Type: ${Documents.#type(context, node)}.\n`;
        const lines = ['| Field | Required | Type | Description |', '| --- | --- | --- | --- |'];
        for (const [name, field] of Object.entries(node.properties)) {
            lines.push(
                `| \`${name}\` | ${(node.required ?? []).includes(name) ? 'Yes' : 'No'} | ${Documents.#type(context, field)} | ${Documents.#description(field)} |`,
            );
        }
        return lines.join('\n') + '\n';
    }

    static #nested(context, node, prefix = '') {
        if (node.$ref) return '';
        let text = '';
        for (const [name, child] of Object.entries(node.properties ?? {})) {
            if (child.$ref) continue;
            const path = prefix ? `${prefix}.${name}` : name;
            const variants = child.anyOf ??
                child.oneOf ?? [child.type === 'array' ? child.items : child];
            for (const [index, variant] of variants.entries()) {
                if (!variant || variant.$ref || !variant.properties) continue;
                text += `\n**${path}${variants.length > 1 ? ` — variant ${index + 1}` : ''}**\n\n${Documents.#fields(context, variant)}\n`;
                text += Documents.#nested(context, variant, path);
            }
        }
        return text;
    }

    static #sample(context, input, key = '', depth = 0) {
        const node = Documents.#resolved(context, input);
        if (depth > 8) return null;
        if (Array.isArray(node.type)) {
            return Documents.#sample(
                context,
                { ...node, type: node.type.includes('null') ? 'null' : node.type[0] },
                key,
                depth + 1,
            );
        }
        if (node.const !== undefined) return node.const;
        if (node.enum) return node.enum[0];
        if (node.anyOf || node.oneOf) {
            const choice = (node.anyOf ?? node.oneOf).find((item) => item.type !== 'null') ?? {
                type: 'null',
            };
            return Documents.#sample(context, choice, key, depth + 1);
        }
        if (node.type === 'object') {
            return Object.fromEntries(
                (node.required ?? []).map((name) => [
                    name,
                    Documents.#sample(context, node.properties[name], name, depth + 1),
                ]),
            );
        }
        if (node.type === 'array') return [];
        if (node.type === 'boolean') return false;
        if (node.type === 'number' || node.type === 'integer') return 1;
        if (node.type === 'null') return null;
        return key === 'message' ? 'Your request' : `YOUR_${key.toUpperCase() || 'VALUE'}`;
    }

    static #example(context, name, params) {
        if (name === 'design.layout.preview') {
            return {
                action: 'canvas',
                key: null,
                operation: {
                    op: 'layout',
                    id: 'YOUR_FRAME_ID',
                    pageId: 'YOUR_PAGE_ID',
                    changes: { gap: 24 },
                },
                params: {
                    id: 'YOUR_DESIGN_ID',
                    revision: 'YOUR_SAVED_REVISION',
                    pageId: 'YOUR_PAGE_ID',
                    includeIds: [],
                    cursor: null,
                    limit: 128,
                },
            };
        }
        return Documents.#sample(context, params);
    }
}
