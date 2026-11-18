/** A deterministic observed-conversion threshold, not an automatic causal experiment decision. */
export interface TelemetryMonitorRule {
    readonly performanceLookbackMs?: string;
    readonly performanceFpsThreshold?: number;
    readonly appliedConfigKey?: string;
    readonly configLookbackMs?: string;
    readonly projectId: string;
    readonly steps: readonly string[];
    readonly lookbackMs: number;
    readonly completionWindowMs: number;
    readonly settleDelayMs: number;
    readonly minimumAttempts: number;
    readonly minimumSessions: number;
    readonly conversionBelow: number;
    readonly cooldownMs: number;
}
/** Host-captured private channel destination; never accepted from model arguments. */
export interface TelemetryNotificationDestination {
    readonly channelId: string;
    readonly conversationId: string;
    readonly threadId?: string;
}
/** Scheduler stores the rule; identity is only in Job.owner, never supplied by this action. */
export interface TelemetryMonitorAction {
    readonly kind: 'roblox-monitor';
    readonly investigate?: boolean;
    readonly destination?: TelemetryNotificationDestination;
    readonly rule: TelemetryMonitorRule;
}
