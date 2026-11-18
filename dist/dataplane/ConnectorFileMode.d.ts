/** Explicit local permission profiles have no implied broader mode or default. */
export declare const ConnectorFileMode: {
    readonly ReadOnly: 'read-only';
    readonly ReadWrite: 'read-write';
};
/** A file grant's access, with the same values as the connector protocol's file mode. */
export type ConnectorFileMode = (typeof ConnectorFileMode)[keyof typeof ConnectorFileMode];
