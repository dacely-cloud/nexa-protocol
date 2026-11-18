/** Dependent UTF-8 and int64 limits complement the public JSON schema at the client boundary. */
export declare class ConnectorInstructionsChecks {
    #private;
    /** Instruction edits cannot exceed exact storage revisions or the UTF-8 byte budget. */
    static update(raw: unknown): boolean;
    /** Returned user preferences obey the same bounds as an accepted edit. */
    static view(raw: unknown): boolean;
    /** Every inventory item carries bounded account-owned text alongside untrusted hardware metadata. */
    static inventory(raw: unknown): boolean;
}
