/** How dangerous an action is. */
export declare const RiskLevel: {
    /** Reads only; no side effects. */
    readonly Read: 'read';
    /** Writes inside the workspace. */
    readonly Write: 'write';
    /** Runs code, or writes outside the workspace. */
    readonly Execute: 'execute';
    /** Irreversible, or reaches outside this machine. */
    readonly Destructive: 'destructive';
};
/** A supported risk category derived from the shared runtime names. */
export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];
