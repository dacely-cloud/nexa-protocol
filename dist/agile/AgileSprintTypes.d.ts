/** Explicit sprint actions preserve a review boundary between completed work and the next increment. */
export declare const AgileSprintAction: {
    readonly Start: 'start';
    readonly Review: 'review';
    readonly Complete: 'complete';
    readonly Reopen: 'reopen';
};
/** Supported lifecycle commands, shared by the model tool and authorized UI actions. */
export type AgileSprintAction = (typeof AgileSprintAction)[keyof typeof AgileSprintAction];
/** A version-bound edit cannot silently overwrite a newer model or user decision. */
export interface AgileSprintCommand {
    readonly id: string;
    readonly action: AgileSprintAction;
    readonly expectedVersion: number;
    readonly review?: string;
}
