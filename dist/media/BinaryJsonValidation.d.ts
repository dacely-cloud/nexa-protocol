import type { BinaryJsonValue } from './interface/BinaryJsonValue.js';
/** Narrows parsed JSON with bounded nesting, without allocating another values array. */
export declare class BinaryJsonValidation {
    /** Accepts only finite JSON values; byte-view carriers are restored after validation. */
    static valid(value: unknown, depth?: number): value is BinaryJsonValue;
    /** Narrows a parsed record before any of its external fields are inspected. */
    static record(value: unknown): value is Readonly<Record<string, unknown>>;
}
