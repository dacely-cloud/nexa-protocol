/**
 * A passive visit never claims native, SSH, or tooling readiness.
 *
 * @remarks
 * `SetupRequired` is also the answer for an account without a current paid plan, so the website
 * opens VM setup, whose terminal state names the plan requirement, instead of waking anything.
 */
export declare enum EnvironmentVisitState {
    SetupRequired = "setup-required",
    Existing = "existing"
}
/** Existing means an existing VM is running, or its original wake was queued or joined. */
export interface EnvironmentVisitResult {
    readonly state: EnvironmentVisitState;
}
/** The authenticated account is the only target; client hints cannot enable creation. */
export interface EnvironmentVisitMethod {
    readonly params: Record<string, never>;
    readonly result: EnvironmentVisitResult;
}
