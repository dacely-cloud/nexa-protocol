/** Public input rules exclude private executable paths and positional fixed arguments. */
export declare const ConnectorArgumentKind: {
    readonly Choice: 'choice';
    readonly Text: 'text';
    readonly RelativePath: 'relative-path';
    readonly MachineInvocation: 'machine-invocation';
    readonly InteractiveInvocation: 'interactive-invocation';
};
/** One connector argument kind. */
export type ConnectorArgumentKind = (typeof ConnectorArgumentKind)[keyof typeof ConnectorArgumentKind];
