/** Replaceable ASR hypothesis for the current utterance. */
export interface VoiceInterimEvent {
    readonly kind: 'interim';
    readonly text: string;
}
/** A voice call status change or transcript. */
export type VoiceCallEvent = VoiceInterimEvent | {
    readonly kind: 'heard';
    readonly text: string;
} | {
    readonly kind: 'said';
    readonly text: string;
} | {
    readonly kind: 'status';
    readonly text: string;
} | {
    readonly kind: 'error';
    readonly message: string;
};
