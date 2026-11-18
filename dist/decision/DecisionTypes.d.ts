/** A choice the caller may execute; the decision endpoint never executes it. */
export interface DecisionAction {
    /** Stable caller-owned identifier, such as jump or open_calculator. */
    readonly id: string;
    readonly description?: string;
}
/** Accepted still-image file formats; temporal and active-content formats are excluded. */
export declare const DecisionImageMime: {
    readonly Png: 'image/png';
    readonly Jpeg: 'image/jpeg';
    readonly Webp: 'image/webp';
};
/** One supported encoded-image MIME type. */
export type DecisionImageMime = (typeof DecisionImageMime)[keyof typeof DecisionImageMime];
/** One original encoded still image. URLs and temporal media are not accepted. */
export interface DecisionImage {
    readonly mimeType: DecisionImageMime;
    readonly data: string;
}
/** One independent decision. Input may be plain text or an intact JSON document. */
export interface DecisionRunParams {
    /** UTF-8 text, at most 32768 bytes. No separate system prompt or history fields are accepted. */
    readonly input: string;
    /** Optional bounded choices. The model must select one of these IDs or abstain. */
    readonly actions?: readonly DecisionAction[];
    /** Request an estimated probability distribution over the supplied actions. */
    readonly probabilities?: boolean;
    /** Allow proposed actions with ordinary names in addition to the supplied choices. */
    readonly allowCustomActions?: boolean;
    /** Request a short explanation of the choice, without internal reasoning. */
    readonly explanation?: boolean;
    /** Request one concise sentence describing the intended next step. */
    readonly brief?: boolean;
    /** At most three PNG, JPEG or still WebP images, each up to 4096 pixels per side. */
    readonly images?: readonly DecisionImage[];
}
/** Bounded token counts for the single model call. */
export interface DecisionUsage {
    readonly inputTokens: number;
    readonly outputTokens: number;
}
/** JSON is retained as text so large numeric identifiers cannot be rounded by transport. */
export interface DecisionRunResult {
    /** A validated JSON object, without Markdown or internal model diagnostics. */
    readonly json: string;
    readonly durationMs: number;
    readonly usage: DecisionUsage;
}
