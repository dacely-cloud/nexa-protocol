import type { FunnelQuery } from '../roblox/telemetry/FunnelTypes.js';
import type { PerformanceQuery } from '../roblox/telemetry/PerformanceTypes.js';
/** Wire queries never carry an owner: the authenticated gateway supplies it. */
export interface TelemetryFunnelParams extends FunnelQuery {
    readonly projectId: string;
}
/** Complete bounded client performance query for one owned project. */
export interface TelemetryPerformanceParams extends PerformanceQuery {
    readonly projectId: string;
}
