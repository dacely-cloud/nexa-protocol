/** Host-observed work, including model calls that do not produce answer text. */
export declare const TurnActivityPhase: {
    readonly Preparing: 'preparing';
    readonly Understanding: 'understanding';
    readonly Planning: 'planning';
    readonly Recalling: 'recalling';
    readonly Thinking: 'thinking';
    readonly Working: 'working';
    readonly Verifying: 'verifying';
    readonly Compacting: 'compacting';
};
/** A stage is chosen by runtime execution, never inferred from generated prose. */
export type TurnActivityPhase = (typeof TurnActivityPhase)[keyof typeof TurnActivityPhase];
/** Bounded live activity and time spent in this stage; it is not a completion estimate. */
export interface TurnActivityEvent {
    readonly type: 'turn-activity';
    readonly phase: TurnActivityPhase;
    /** @maxLength 300 */
    readonly detail: string;
    /** @minimum 0
     * @maximum 2147483647
     */
    readonly elapsedSeconds: number;
}
/** Existing clients can display the status while newer clients read its structured activity. */
export interface TurnActivityStatusEvent {
    readonly type: 'status';
    readonly status: string;
    readonly detail?: string;
    readonly activity?: TurnActivityEvent;
}
