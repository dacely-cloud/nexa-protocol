/** Keyboard repetition reuses a held input; pointer gestures have no Repeat phase. */
export declare const RobloxKeyboardPhase: {
    readonly Press: 'Press';
    readonly Release: 'Release';
    readonly Cancel: 'Cancel';
    readonly Repeat: 'Repeat';
};
/** Allowed phases for native held-key commands. */
export type RobloxKeyboardPhase = (typeof RobloxKeyboardPhase)[keyof typeof RobloxKeyboardPhase];
/** A physical key remains held until its matching release or cancellation. */
export interface RobloxKeyboardGesture {
    readonly phase: RobloxKeyboardPhase;
    readonly key: string;
}
