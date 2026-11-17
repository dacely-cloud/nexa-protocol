/** Saved reasoning levels shared by workflows and provider requests; null uses the service default. */
export declare const WorkflowModelEffort: {
    readonly Off: 'off';
    readonly Minimal: 'minimal';
    readonly Low: 'low';
    readonly Medium: 'medium';
    readonly High: 'high';
    readonly XHigh: 'xhigh';
    readonly Max: 'max';
};
/** One explicit effort level, independent of model-selection policy. */
export type WorkflowModelEffort = (typeof WorkflowModelEffort)[keyof typeof WorkflowModelEffort];
