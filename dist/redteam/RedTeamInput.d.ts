/** Strict JSON boundary primitives shared by request and response decoders. */
export declare class RedTeamInput {
    #private;
    /** Reject unknown keys, accessors and non-plain objects before reading external data. */
    static record(raw: unknown, required: readonly string[], optional?: readonly string[]): Readonly<Record<string, unknown>>;
    /** Read well-formed bounded text, allowing an empty string only when explicitly requested. */
    static text(raw: unknown, maximum: number, empty?: boolean): string;
    /** Validate bounded identities used in requests, ledger references and session links. */
    static id(raw: unknown): string;
    /** Preserve exact nonnegative signed int64 values as canonical decimal strings. */
    static decimal(raw: unknown): string;
    /** Read a deliberately small integer within inclusive host-controlled bounds. */
    static integer(raw: unknown, minimum: number, maximum: number): number;
    /** Bound collection length before decoding every external element. */
    static list<T>(raw: unknown, maximum: number, decode: (value: unknown) => T): readonly T[];
    /** Accept only a value from the shared runtime discriminator definition. */
    static choice<T extends string>(raw: unknown, choices: Readonly<Record<string, T>>): T;
    /** Reject duplicate identities before they can introduce ambiguous ledger references. */
    static unique(values: readonly string[]): void;
}
