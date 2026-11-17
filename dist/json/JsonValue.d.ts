/** A JSON value, as it appears in a tool's arguments or a JSON Schema. */
export type JsonValue = string | number | boolean | null | readonly JsonValue[] | {
    readonly [key: string]: JsonValue;
};
