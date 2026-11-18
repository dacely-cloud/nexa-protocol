// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
import { Graphics } from '../graphics/Graphic.js';
import { VisualResponses } from '../visuals/VisualResponses.js';
/** Validates JSON contracts without runtime code generation, suitable for browser CSPs. */
export class SchemaValidator {
    /** Owns a schema snapshot independent of the running Nexa installation. */
    #root;
    #resolved = new Map();
    #unions = new WeakMap();
    #patterns = new WeakMap();
    constructor(root) {
        this.#root = root;
    }
    /** Validates an untrusted payload at an emitted schema location. */
    validate(path, value) {
        const schema = this.#resolve(path);
        return schema !== undefined && this.#check(schema, value, 0);
    }
    #resolve(path) {
        if (this.#resolved.has(path)) {
            return this.#resolved.get(path);
        }
        const parts = path.replace(/^.*#\//, '').split('/');
        let schema = this.#root;
        for (let i = 0; i < parts.length; i += 2) {
            const key = parts[i + 1];
            if (key === undefined) {
                return undefined;
            }
            const decoded = decodeURIComponent(key)
                .replaceAll('~1', '/')
                .replaceAll('~0', '~');
            if (parts[i] === 'definitions') {
                schema = schema?.definitions?.[decoded];
            }
            else if (parts[i] === 'properties') {
                schema = schema?.properties?.[decoded];
            }
            else {
                return undefined;
            }
        }
        if (schema !== undefined && this.#resolved.size < 4096) {
            this.#resolved.set(path, schema);
        }
        return schema;
    }
    /** Compile trusted patterns once; malformed schema constraints fail closed without executing generated code. */
    #pattern(schema, value) {
        let pattern = this.#patterns.get(schema);
        if (pattern === undefined) {
            try {
                pattern = new RegExp(schema.pattern ?? '', 'u');
            }
            catch {
                pattern = null;
            }
            this.#patterns.set(schema, pattern);
        }
        return pattern !== null && pattern.test(value);
    }
    /** Index only branches whose required, distinct constants prove all other branches impossible. */
    #discriminator(schema) {
        const cached = this.#unions.get(schema);
        if (cached !== undefined) {
            return cached;
        }
        this.#unions.set(schema, null);
        const alternatives = schema.anyOf;
        if (alternatives === undefined || alternatives.length < 2) {
            return null;
        }
        const resolved = [];
        for (const alternative of alternatives) {
            let branch = alternative;
            for (let depth = 0; branch?.$ref !== undefined && depth <= 256; depth++) {
                branch = this.#resolve(branch.$ref);
            }
            if (branch === undefined || branch.$ref !== undefined) {
                return null;
            }
            resolved.push(branch);
        }
        const first = resolved[0];
        for (const key of first?.required ?? []) {
            const branches = new Map();
            for (let index = 0; index < resolved.length; index++) {
                const branch = resolved[index];
                const original = alternatives[index];
                const tag = branch?.properties?.[key];
                if (!branch?.required?.includes(key) ||
                    typeof tag?.const !== 'string' ||
                    branches.has(tag.const) ||
                    original === undefined) {
                    break;
                }
                branches.set(tag.const, original);
            }
            if (branches.size === alternatives.length) {
                const discriminator = { key, branches };
                this.#unions.set(schema, discriminator);
                return discriminator;
            }
        }
        return null;
    }
    /**
     * Checks one value against one schema node.
     *
     * @remarks
     * The depth counts schema references and union branches as well as data nesting. A valid 32-level workflow
     * configuration traverses more than 128 schema nodes, so the finite stack budget leaves room for its enclosing
     * method, patch and node schemas.
     */
    #check(schema, value, depth) {
        if (depth > 256) {
            return false;
        }
        if (schema.$ref === '#/definitions/VisualResponse') {
            return VisualResponses.isValid(value);
        }
        if (schema.$ref === '#/definitions/Graphic') {
            return Graphics.isValid(value);
        }
        if (schema.$ref !== undefined) {
            const resolved = this.#resolve(schema.$ref);
            return resolved !== undefined && this.#check(resolved, value, depth + 1);
        }
        if ('const' in schema && value !== schema.const) {
            return false;
        }
        if (schema.enum !== undefined &&
            !schema.enum.some((item) => value === item)) {
            return false;
        }
        if (schema.anyOf !== undefined) {
            const discriminator = this.#discriminator(schema);
            if (discriminator !== null && isRecord(value)) {
                const tag = value[discriminator.key];
                const branch = typeof tag === 'string' ? discriminator.branches.get(tag) : undefined;
                if (branch === undefined || !this.#check(branch, value, depth + 1)) {
                    return false;
                }
            }
            else if (!schema.anyOf.some((item) => this.#check(item, value, depth + 1))) {
                return false;
            }
        }
        if (schema.allOf !== undefined &&
            !schema.allOf.every((item) => this.#check(item, value, depth + 1))) {
            return false;
        }
        if (Array.isArray(schema.type)) {
            if (!schema.type.some((item) => this.#matchesType(item, value))) {
                return false;
            }
        }
        else if (typeof schema.type === 'string' && !this.#matchesType(schema.type, value)) {
            return false;
        }
        if (typeof value === 'number' &&
            ((schema.minimum !== undefined && value < schema.minimum) ||
                (schema.maximum !== undefined && value > schema.maximum))) {
            return false;
        }
        if (typeof value === 'string' &&
            ((schema.maxLength !== undefined && value.length > schema.maxLength) ||
                (schema.minLength !== undefined && value.length < schema.minLength))) {
            return false;
        }
        if (typeof value === 'string' &&
            schema.pattern !== undefined &&
            !this.#pattern(schema, value)) {
            return false;
        }
        if (Array.isArray(value) &&
            ((schema.maxItems !== undefined && value.length > schema.maxItems) ||
                (schema.minItems !== undefined && value.length < schema.minItems))) {
            return false;
        }
        if (Array.isArray(value) && schema.items !== undefined) {
            for (const item of value) {
                if (!this.#check(schema.items, item, depth + 1)) {
                    return false;
                }
            }
        }
        if (isRecord(value)) {
            for (const key of schema.required ?? []) {
                if (!Object.hasOwn(value, key)) {
                    return false;
                }
            }
            for (const key of Object.keys(value)) {
                const property = schema.properties !== undefined && Object.hasOwn(schema.properties, key)
                    ? schema.properties[key]
                    : undefined;
                if (property !== undefined && !this.#check(property, value[key], depth + 1)) {
                    return false;
                }
                if (property === undefined) {
                    if (schema.additionalProperties === false) {
                        return false;
                    }
                    if (typeof schema.additionalProperties === 'object' &&
                        !this.#check(schema.additionalProperties, value[key], depth + 1)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    #matchesType(type, value) {
        switch (type) {
            case 'null':
                return value === null;
            case 'object':
                return isRecord(value);
            case 'array':
                return Array.isArray(value);
            case 'number':
                return (typeof value === 'number' &&
                    Number.isFinite(value) &&
                    (!Number.isInteger(value) || Number.isSafeInteger(value)));
            case 'integer':
                return typeof value === 'number' && Number.isSafeInteger(value);
            case 'boolean':
                return typeof value === 'boolean';
            case 'string':
                return typeof value === 'string';
            default:
                return false;
        }
    }
}
/** Narrows objects only at the schema trust boundary. */
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
