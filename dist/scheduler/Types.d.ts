import type { TelemetryMonitorAction } from '../roblox/telemetry/MonitorTypes.js';
import type { ElevationMode } from '../sandbox/PolicyTypes.js';
import type { JsonValue } from '../json/JsonValue.js';
/**
 * The scheduler's data model.
 *
 * The requirement this serves is "support when program exit and is rebooted": a job's definition and
 * its run state both live on disk, so a restart resumes a schedule rather than starting a new one.
 * That means the interesting design question is not "how do I fire a timer" but "what should have
 * happened while the process was gone" — which is what {@link MisfirePolicy} answers, per job,
 * explicitly.
 */
/** What a job does when it fires. */
export type JobAction = TelemetryMonitorAction | ReminderAction | {
    /** Run an agent turn with this prompt. The ordinary case. */
    readonly kind: 'agent-turn';
    readonly agentId: string;
    readonly prompt: string;
    /** Where the reply goes: a channel id, or absent to leave it in the session. */
    readonly deliverTo?: string;
    /** Suppress delivery when the turn produced nothing worth sending. */
    readonly silentWhenEmpty?: boolean;
} | {
    /** Run a shell command. Its stdout becomes the run's output. */
    readonly kind: 'shell';
    readonly command: string;
    readonly cwd?: string;
    readonly timeoutMs?: number;
    /**
     * Allow a command that stops or restarts Nexa itself.
     *
     * Refused by default because scheduling one from inside the scheduler is a loop rather
     * than a task — see `assertNotLifecycleCommand`. A nightly restart is a legitimate thing
     * to want, and this is how to say so.
     */
    readonly allowSelfLifecycle?: boolean;
    /**
     * Run this command outside the sandbox, if the policy allows it.
     *
     * The operator's own decision about their own machine, which is why it lives on a job
     * they wrote and not on an argument a model fills in. Authorized against the policy at
     * the moment of the spawn: `sandbox.required` refuses it outright, and anything stronger
     * than `sandbox.elevation` is refused as exceeding it.
     *
     * A backup script that has to read outside the workspace roots is the case this exists
     * for — before it, the elevation axis was declared, defaulted to `off`, and unreachable.
     */
    readonly elevation?: ElevationMode;
} | {
    /** Call a registered tool directly, with no model in the loop. */
    readonly kind: 'tool';
    readonly tool: string;
    readonly input: JsonValue;
} | {
    /** Emit an event other subsystems subscribe to. */
    readonly kind: 'event';
    readonly event: string;
    readonly payload?: JsonValue;
} | {
    /**
     * Housekeeping: expired media, expired workspaces, memories past their TTL.
     *
     * A kind rather than a `shell` job because the work is in-process — it needs the media
     * store, the workspace manager and the memory store this deployment constructed, not a
     * command line — and because a deployment should not have to write a cron entry to stop
     * accumulating every screenshot anybody ever sent it.
     */
    readonly kind: 'maintenance';
};
/** A durable message to the conversation that requested it; no model execution. */
export interface ReminderAction {
    readonly kind: 'reminder';
    readonly text: string;
    readonly channelId: string;
    readonly conversationId: string;
    readonly threadId?: string;
}
/**
 * What to do about occurrences that elapsed while the process was down.
 *
 * There is no safe default here, which is exactly why it is a per-job field. A daily digest that
 * missed three days should send ONE digest (`run-once`); a billing rollup that missed three days
 * must process all three (`run-all`); a "remind me at 9am" whose 9am passed six hours ago should
 * probably stay quiet (`skip`). Choosing one globally is wrong for the other two.
 */
export declare const MisfirePolicy: {
    /** Ignore everything missed; wait for the next scheduled occurrence. */
    readonly Skip: 'skip';
    /** Run exactly once to catch up, no matter how many occurrences were missed. */
    readonly RunOnce: 'run-once';
    /** Run once per missed occurrence, in order. */
    readonly RunAll: 'run-all';
    /** Run once, but only if the most recent missed occurrence is within `graceMs`. */
    readonly RunIfRecent: 'run-if-recent';
};
/** What a job does about runs it missed. */
export type MisfirePolicy = (typeof MisfirePolicy)[keyof typeof MisfirePolicy];
/** When a job fires. */
export type JobTrigger = {
    readonly kind: 'cron';
    /** A five- or six-field cron expression, or an `@daily`-style alias. */
    readonly expression: string;
    /** An IANA timezone; occurrences are local wall-clock times in it. */
    readonly timezone?: string;
} | {
    /** Every `intervalMs`, measured from the last completion. */
    readonly kind: 'interval';
    readonly intervalMs: number;
} | {
    /** Exactly once, at `at`. */
    readonly kind: 'once';
    readonly at: number;
};
/** A scheduled job as it is stored. */
export interface Job {
    readonly id: string;
    readonly name: string;
    readonly trigger: JobTrigger;
    readonly action: JobAction;
    /** Disabled jobs stay stored and stop firing. */
    readonly enabled: boolean;
    readonly misfirePolicy: MisfirePolicy;
    /** For {@link MisfirePolicy.RunIfRecent}: how stale a missed occurrence may be. */
    readonly graceMs?: number;
    /**
     * Whether a new run may start while a previous one is still going.
     *
     * Default false. An every-minute job whose run takes 90 seconds will otherwise pile up runs
     * until the process dies — the classic naive-scheduler failure.
     */
    readonly allowConcurrent?: boolean;
    /** A hard ceiling on one run, after which it is aborted and recorded as timed out. */
    readonly timeoutMs?: number;
    /** How many times a failed run is retried before the occurrence is abandoned. */
    readonly maxRetries?: number;
    /** Who owns this job, for permissions and for credit attribution. */
    readonly owner?: JobOwner;
    readonly createdAt: number;
    readonly updatedAt: number;
    /** Free-form labels for querying. */
    readonly tags?: readonly string[];
}
/** Who a job belongs to — the four scopes credit is tracked against. */
export interface JobOwner {
    readonly userId?: string;
    readonly agentId?: string;
    readonly projectId?: string;
    readonly conversationId?: string;
}
