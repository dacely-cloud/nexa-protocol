import type { TelemetryHealth } from './Health.js';
/** End-exclusive server-observed report timestamps; sample windows can begin before fromMs. */
export interface PerformanceQuery {
    readonly fromMs: string;
    readonly toMs: string;
}
/** Input capability reports are not hardware or operating-system identification. */
export interface PerformanceCohort {
    readonly placeId: string;
    readonly placeVersion: string;
    readonly touchEnabled: boolean;
    readonly keyboardEnabled: boolean;
    readonly gamepadEnabled: boolean;
}
/** Aggregate metrics expose no player/session identifiers. Counts are decimal strings. */
export interface PerformanceGroup {
    readonly cohort: PerformanceCohort;
    readonly samples: number;
    readonly sessions: number;
    readonly frames: string;
    readonly slowFrames: string;
    readonly sampledDurationMs: number;
    readonly timeWeightedFps: number;
    readonly meanSessionFps: number;
    readonly slowFrameFraction: number;
    readonly maximumFrameMs: number;
}
/** Complete bounded selection with quality counts and collection diagnostics. */
export interface PerformanceReport {
    readonly query: PerformanceQuery;
    readonly generatedAtMs: string;
    readonly latestSampleMs: string | null;
    readonly groups: readonly PerformanceGroup[];
    readonly invalidSamples: number;
    readonly ignoredSourceSamples: number;
    readonly duplicateSamples: number;
    readonly collection?: TelemetryHealth;
    readonly caveats: readonly string[];
}
