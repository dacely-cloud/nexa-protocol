/** JSON Schema subset emitted from Nexa's TypeScript contracts. */
export interface Schema {
    readonly $ref?: string;
    readonly type?: string | readonly string[];
    readonly const?: string | number | boolean | null;
    readonly enum?: readonly (string | number | boolean | null)[];
    readonly anyOf?: readonly Schema[];
    readonly allOf?: readonly Schema[];
    readonly properties?: Readonly<Record<string, Schema>>;
    readonly required?: readonly string[];
    readonly items?: Schema;
    readonly additionalProperties?: boolean | Schema;
    readonly definitions?: Readonly<Record<string, Schema>>;
    readonly description?: string;
    readonly minimum?: number;
    readonly maximum?: number;
    readonly maxLength?: number;
    readonly minLength?: number;
    /** Trusted generated contracts may constrain opaque identifiers and exact revision encodings. */
    readonly pattern?: string;
    readonly maxItems?: number;
    readonly minItems?: number;
    readonly $id?: string;
    readonly $schema?: string;
}
/** Validates JSON contracts without runtime code generation, suitable for browser CSPs. */
export declare class SchemaValidator {
    #private;
    constructor(root: Schema);
    /** Validates an untrusted payload at an emitted schema location. */
    validate(path: string, value: unknown): boolean;
}
