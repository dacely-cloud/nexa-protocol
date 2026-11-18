/** Tooling readiness is separate from fleet security qualification. */
export declare enum EnvironmentPreparationState {
    Preparing = "preparing",
    Ready = "ready",
    Failed = "failed",
    Interrupted = "interrupted"
}
/** Ordered controller-authored presentation; guest command output is never progress text. */
export interface EnvironmentPreparationEvent {
    readonly cursor: string;
    readonly state: EnvironmentPreparationState;
    readonly detail: string;
}
/** One current account preparation, resumable from any Nexa replica. */
export interface EnvironmentPreparationPage {
    readonly operationId: string;
    readonly state: EnvironmentPreparationState;
    readonly currentTask: string;
    readonly cursor: string;
    readonly reset: boolean;
    readonly events: readonly EnvironmentPreparationEvent[];
}
/** The account always comes from the authenticated connection. */
export interface EnvironmentPreparationQuery {
    readonly operationId: string;
    readonly cursor: string;
}
/** Starts or joins preparation; it never accepts an account, host, command or machine selector. */
export interface EnvironmentPrepareMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: EnvironmentPreparationPage;
}
/** Reads bounded progress after the last acknowledged cursor. */
export interface EnvironmentStatusMethod {
    readonly params: EnvironmentPreparationQuery;
    readonly result: EnvironmentPreparationPage;
}
