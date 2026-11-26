// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Shared boundary primitives keep the portable visual decoder strict and bounded. */
export class VisualValue {
    static record(raw, fields, complete = false) {
        if (typeof raw !== 'object' ||
            raw === null ||
            Array.isArray(raw) ||
            Object.keys(raw).some((key) => !fields.includes(key))) {
            throw new Error('Unexpected visual fields. Use only the documented UI instructions.');
        }
        if (complete &&
            fields.some((field) => !Object.hasOwn(raw, field) || Reflect.get(raw, field) === undefined)) {
            throw new Error('Incomplete visual delivery. Native tools must normalize optional UI fields before transmission.');
        }
        return raw;
    }
    static text(raw, limit, fallback) {
        if (raw === undefined && fallback !== undefined) {
            return fallback;
        }
        if (typeof raw !== 'string' ||
            raw.length > limit ||
            (fallback === undefined && raw.trim() === '')) {
            throw new Error(`Invalid visual text. Maximum ${limit} characters.`);
        }
        return raw;
    }
    static id(raw) {
        const id = this.text(raw, 64);
        if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/u.test(id)) {
            throw new Error('Visual identifiers use letters, digits, underscores and hyphens.');
        }
        return id;
    }
    static number(raw, min, max) {
        if (typeof raw !== 'number' || !Number.isFinite(raw) || raw < min || raw > max) {
            throw new Error('Visual geometry is outside the supported bounds.');
        }
        return raw;
    }
    static choice(raw, values, fallback) {
        if (raw === undefined) {
            return fallback;
        }
        const value = Object.values(values).find((value) => value === raw);
        if (value === undefined) {
            throw new Error('Unsupported visual style.');
        }
        return value;
    }
    static array(raw, max) {
        if (raw === undefined) {
            return [];
        }
        if (!Array.isArray(raw) || raw.length > max) {
            throw new Error('Too many visual instructions.');
        }
        return raw;
    }
}
