import type { BinaryEncodingValues } from './BinaryEncodingValues.js';
/** Immutable encoding names shared by envelope planning and restoration. */
export declare const BinaryEncoding: Readonly<BinaryEncodingValues>;
/** One encoding from the single runtime mapping. */
export type BinaryEncoding = (typeof BinaryEncoding)[keyof typeof BinaryEncoding];
