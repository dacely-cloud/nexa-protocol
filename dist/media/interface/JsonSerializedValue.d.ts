/** Readonly JSON and typed byte views accepted by allocation-free serialized sizing. */
export type JsonSerializedValue = null | boolean | number | string | Uint8Array | readonly JsonSerializedValue[] | JsonSerializedObject;
/** Readonly fields exposed by a validated JSON value. */
export interface JsonSerializedObject {
    readonly [key: string]: JsonSerializedValue | undefined;
}
