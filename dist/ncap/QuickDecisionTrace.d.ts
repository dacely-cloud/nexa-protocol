/** Trace phases for a caller-only model generation. */
export declare const QuickDecisionPhase: {
    readonly Prompt: 'prompt';
    readonly Complete: 'complete';
};
/** Exact text before tokenization, and the actual tokens submitted to the shared engine. */
export interface QuickDecisionPrompt {
    readonly phase: typeof QuickDecisionPhase.Prompt;
    readonly elapsedNs: bigint;
    readonly renderedPrompt: string | null;
    readonly tokenIds: readonly number[];
}
/** Raw model output before presentation, with wall-clock generation timing. */
export interface QuickDecisionComplete {
    readonly phase: typeof QuickDecisionPhase.Complete;
    readonly elapsedNs: bigint;
    readonly firstTokenNs: bigint | null;
    readonly tokenIds: readonly number[];
    readonly rawOutput: string;
    readonly finishReason: string;
}
/** A diagnostic receipt, never assistant content. */
export type QuickDecisionTrace = QuickDecisionPrompt | QuickDecisionComplete;
