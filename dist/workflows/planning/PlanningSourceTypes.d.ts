/** Discovery of a registered source is not a grant or an executable resource binding. */
export declare const PlanningSourceState: {
    readonly NeedsAdapter: 'needs-adapter';
    readonly Unavailable: 'unavailable';
};
export type PlanningSourceState = (typeof PlanningSourceState)[keyof typeof PlanningSourceState];
/** Metadata only. No filesystem paths, credentials, file contents, or host telemetry. */
export interface PlanningSource {
    readonly id: string;
    readonly name: string;
    readonly state: PlanningSourceState;
    readonly reason: string;
}
/** Owner-scoped catalog pagination; a cursor is an opaque source identity, not a path. */
export interface PlanningSourcesRequest {
    readonly workflowId: string;
    readonly after: string | null;
}
export interface PlanningSourcesPage {
    readonly available: boolean;
    readonly items: readonly PlanningSource[];
    readonly next: string | null;
}
