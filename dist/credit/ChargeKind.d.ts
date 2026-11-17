export declare const ChargeKind: {
    /** Model tokens. */
    readonly Completion: 'completion';
    /** An embedding call. */
    readonly Embedding: 'embedding';
    /** Text-to-speech. */
    readonly Speech: 'speech';
    /** Speech-to-text. */
    readonly Transcription: 'transcription';
    /** Image / video generation. */
    readonly Media: 'media';
    /** A metered tool or third-party API call. */
    readonly Tool: 'tool';
    /** A manual adjustment: a top-up, a refund, a correction. */
    readonly Adjustment: 'adjustment';
};
export type ChargeKind = (typeof ChargeKind)[keyof typeof ChargeKind];
