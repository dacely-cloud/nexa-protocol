/** The runtime selects a target adapter; callers may make the choice explicit for ambiguous files. */
export declare const ReverseTarget: {
    readonly Native: 'native';
    readonly JavaScript: 'javascript';
    readonly Source: 'source';
    readonly Network: 'network';
    readonly Browser: 'browser';
};
/** One reverse-engineering target kind. */
export type ReverseTarget = (typeof ReverseTarget)[keyof typeof ReverseTarget];
/** Runtime task lifecycle, distinct from the truth of model-authored findings. */
export declare const ReverseState: {
    readonly Pending: 'pending';
    readonly Running: 'running';
    readonly Done: 'done';
    readonly Failed: 'failed';
    readonly Cancelled: 'cancelled';
    readonly Partial: 'partial';
};
/** Possible task and workflow states. */
export type ReverseState = (typeof ReverseState)[keyof typeof ReverseState];
