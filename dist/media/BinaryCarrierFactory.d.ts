import type { BinaryCarrier } from './interface/BinaryCarrier.js';
/** Validates carrier values without enumerating typed bytes or allocating decoded payloads. */
export declare class BinaryCarrierFactory {
    #private;
    /** Leaves noncanonical aliases in metadata so restoration preserves their exact original text. */
    static base64(value: string, path: readonly string[]): BinaryCarrier | null;
    /** Accepts byte views, byte arrays and dense indexed objects without an Object.values copy. */
    static array(value: unknown, path: readonly string[]): BinaryCarrier | null;
}
