/** Owner-visible collection evidence, not a guarantee that the game emitted every required event. */
export interface TelemetryHealth {
    readonly projectId: string;
    readonly ingestionEnabled: boolean;
    readonly storedEvents: number;
    readonly storedPayloadBytes: string;
    readonly maxEvents: number;
    readonly maxPayloadBytes: string;
    readonly retentionDays: number;
    readonly retainedFromMs: string;
    readonly latestEventMs: string | null;
    readonly lastSuccessfulBatchMs: string | null;
    readonly lastCapacityRejectionMs: string | null;
    readonly caveats: readonly string[];
}
