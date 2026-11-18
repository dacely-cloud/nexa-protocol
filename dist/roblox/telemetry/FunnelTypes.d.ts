import type { TelemetryHealth } from './Health.js';
/** First-step cohort window and maximum allowed time to complete a funnel. Decimal milliseconds. */
export interface FunnelQuery {
    readonly performanceLookbackMs?: string;
    readonly performanceFpsThreshold?: number;
    readonly appliedConfigKey?: string;
    readonly configLookbackMs?: string;
    readonly steps: readonly string[];
    readonly fromMs: string;
    readonly toMs: string;
    readonly completionWindowMs: string;
}
/** Exact cohort dimensions; games are already separated by owner/project in storage. */
export interface FunnelCohort {
    readonly observedPerformance?: string;
    readonly observedConfig?: string;
    readonly placeId: string;
    readonly placeVersion: string;
    readonly device: string;
    readonly configRevision: string;
    readonly experimentId: string;
    readonly variant: string;
}
/** Bounded attempt counts, not unique users; each stage count is cumulative from the first step. */
export interface FunnelGroup {
    readonly cohort: FunnelCohort;
    readonly attempts: number;
    readonly sessions: number;
    readonly reached: readonly number[];
    readonly conversion: number;
}
/** Evidence returned to the model; raw player/session identifiers are not included. */
export interface FunnelReport {
    readonly unmeasuredPerformanceAttempts?: number;
    readonly collection?: TelemetryHealth;
    readonly unattributedConfigAttempts?: number;
    readonly query: FunnelQuery;
    readonly observedUntilMs: string;
    readonly generatedAtMs: string;
    readonly latestMatchingEventMs: string | null;
    readonly groups: readonly FunnelGroup[];
    readonly pendingAttempts: number;
    readonly mixedCohortAttempts: number;
    readonly missingStartAttempts: number;
    readonly missingAttemptEvents: number;
    readonly ignoredClientEvents: number;
    readonly duplicateEvents: number;
    readonly repeatedStartEvents: number;
    readonly caveats: readonly string[];
}
