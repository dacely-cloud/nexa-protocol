import type { RedTeamExecutionAction, RedTeamHistorySelection } from './RedTeamExecutionTypes.js';
export * from './RedTeamExecutionTypes.js';
/** Wire limits bound individual messages without bounding an effort's lifetime. */
export declare const RedTeamLimits: {
    readonly defaultParallelism: 8;
    readonly maxParallelism: 50;
    readonly maxDelegatedAgents: 200;
    readonly pageSize: 100;
    readonly maxFiles: 100;
    readonly rulesCharacters: 64000;
};
/** Supported target selection mechanisms. */
export declare const RedTeamSourceKind: {
    readonly GitHub: 'github';
    readonly Files: 'files';
};
/** Target selection discriminator. */
export type RedTeamSourceKind = (typeof RedTeamSourceKind)[keyof typeof RedTeamSourceKind];
/** The server resolves access to uploaded files under the authenticated principal. */
export interface RedTeamFilesSource {
    readonly kind: typeof RedTeamSourceKind.Files;
    readonly fileIds: readonly string[];
}
/** HTTPS GitHub repository location; credentials and arbitrary fetch URLs are prohibited. */
export interface RedTeamGitHubSource {
    readonly kind: typeof RedTeamSourceKind.GitHub;
    readonly url: string;
}
/** Exactly one uploaded selection or GitHub repository. */
export type RedTeamSource = RedTeamFilesSource | RedTeamGitHubSource;
/** Effort lifecycle states; completion of individual tasks does not stop an effort. */
export declare const RedTeamStatus: {
    readonly Running: 'running';
    readonly Stopping: 'stopping';
    readonly Stopped: 'stopped';
    readonly Failed: 'failed';
};
/** Effort lifecycle discriminator. */
export type RedTeamStatus = (typeof RedTeamStatus)[keyof typeof RedTeamStatus];
/** Worker scheduling and termination states. */
export declare const RedTeamAgentStatus: {
    readonly Pending: 'pending';
    readonly Running: 'running';
    readonly Verifying: 'verifying';
    readonly Idle: 'idle';
    readonly Stopped: 'stopped';
    readonly Failed: 'failed';
};
/** Worker lifecycle discriminator. */
export type RedTeamAgentStatus = (typeof RedTeamAgentStatus)[keyof typeof RedTeamAgentStatus];
/** Ledger progress independent of the effort lifecycle. */
export declare const RedTeamTaskStatus: {
    readonly Planned: 'planned';
    readonly Running: 'running';
    readonly Blocked: 'blocked';
    readonly Completed: 'completed';
    readonly Cancelled: 'cancelled';
};
/** Task progress discriminator. */
export type RedTeamTaskStatus = (typeof RedTeamTaskStatus)[keyof typeof RedTeamTaskStatus];
/** Explicit verification outcome; pending candidates remain distinguishable. */
export declare const RedTeamFindingStatus: {
    readonly Pending: 'pending';
    readonly Confirmed: 'confirmed';
    readonly Rejected: 'rejected';
};
/** Finding verification discriminator. */
export type RedTeamFindingStatus = (typeof RedTeamFindingStatus)[keyof typeof RedTeamFindingStatus];
/** Severity labels retained independently of the numerical CVSS score. */
export declare const RedTeamSeverity: {
    readonly Critical: 'critical';
    readonly High: 'high';
    readonly Medium: 'medium';
    readonly Low: 'low';
    readonly Info: 'info';
};
/** Finding severity discriminator. */
export type RedTeamSeverity = (typeof RedTeamSeverity)[keyof typeof RedTeamSeverity];
/** Decimal wire counters and timestamps retain integer precision across JSON peers. */
export interface RedTeamEffort {
    readonly effortId: string;
    readonly title: string;
    readonly source: RedTeamSource;
    readonly rules: string;
    readonly parallelism: number;
    readonly status: RedTeamStatus;
    readonly revision: string;
    readonly createdAtMs: string;
    readonly updatedAtMs: string;
    /** Ordinary owner-scoped Chat session for the orchestrator and its event journal. */
    readonly sessionKey: string;
    readonly taskCount: string;
    readonly findingCount: string;
    readonly error: string | null;
}
/** Chat events, history, tool output and terminal attachments stay in the existing session APIs. */
export interface RedTeamAgent {
    /** Exact saved native frames when this worker shares its parent's archive. */
    readonly historySelection?: RedTeamHistorySelection;
    readonly agentId: string;
    /** The name this worker uses in the effort and its conversation. */
    readonly name?: string;
    readonly sessionKey: string | null;
    readonly status: RedTeamAgentStatus;
    readonly taskId: string | null;
    readonly activity: string;
}
/** An observed native descendant with its real parent, goal and original archive selection. */
export interface RedTeamDelegatedAgent extends RedTeamAgent {
    readonly parentAgentId: string;
    readonly historySelection: RedTeamHistorySelection;
    readonly goal: string;
}
/** Recorded work exchanges, without inferring relationships from model prose. */
export declare const RedTeamCoordinationKind: {
    readonly Assign: 'assign';
    readonly Result: 'result';
    readonly Verify: 'verify';
    readonly Progress: 'progress';
};
/** The operation recorded by one coordination event. */
export type RedTeamCoordinationKind = (typeof RedTeamCoordinationKind)[keyof typeof RedTeamCoordinationKind];
/** A saved exchange linking an agent to real work or a reported finding. */
export interface RedTeamCoordinationEvent {
    /** Present only when the native engine observed this exact action lifecycle. */
    readonly action?: RedTeamExecutionAction;
    readonly eventId: string;
    /** Exact increasing sequence within this effort, encoded without precision loss. */
    readonly sequence: string;
    /** Event time in decimal milliseconds. */
    readonly atMs: string;
    readonly kind: RedTeamCoordinationKind;
    /** The worker involved; the orchestrator is the effort's main session. */
    readonly agentId: string;
    readonly taskId: string | null;
    readonly findingId: string | null;
    /** A short explanation of the recorded action in plain language. */
    readonly summary: string;
}
/** One persisted unit of planned, active or finished work. */
export interface RedTeamTask {
    readonly taskId: string;
    readonly title: string;
    readonly description: string;
    readonly status: RedTeamTaskStatus;
    readonly agentId: string | null;
    readonly updatedAtMs: string;
}
/** Artifact access remains subject to the existing authenticated file download boundary. */
export interface RedTeamEvidence {
    /** Owning researcher archive; omitted selects the finding reporter and null selects the orchestrator. */
    readonly agentId?: string | null;
    readonly fileId: string | null;
    readonly description: string;
}
/** A source readers can open to learn more or check a report's claims. */
export interface RedTeamReportReference {
    /** A short name describing what the linked page explains. */
    readonly title: string;
    /** An HTTP or HTTPS link without embedded account credentials. */
    readonly url: string;
}
/** Extra report details in plain language. Missing fields have not been reported yet. */
export interface RedTeamFindingReport {
    /** What could go wrong for people who use the affected software. */
    readonly impact?: string;
    /** Software versions that were checked and found to be affected. */
    readonly affectedVersions?: string;
    /** Conditions needed before the reported problem can happen. */
    readonly prerequisites?: readonly string[];
    /** What the software should do when it works safely. */
    readonly expectedBehavior?: string;
    /** What the researcher observed the software doing instead. */
    readonly actualBehavior?: string;
    /** How the software owner can fix or reduce the problem. */
    readonly remediation?: string;
    /** Deeper explanation for the people investigating or fixing the problem. */
    readonly technicalDetails?: string;
    /** Published CVE identifiers only; an empty list means none have been assigned. */
    readonly cveIds?: readonly string[];
    /** Reported CWE categories; an empty list means none have been identified. */
    readonly cweIds?: readonly string[];
    /** Supporting pages the reader can open to check the explanation. */
    readonly references?: readonly RedTeamReportReference[];
}
/** A reported candidate or confirmed finding with retained verification evidence. */
export interface RedTeamFinding {
    readonly findingId: string;
    readonly title: string;
    readonly severity: RedTeamSeverity;
    readonly status: RedTeamFindingStatus;
    /** Decimal score from 0 through 10, with at most one decimal digit. */
    readonly cvssScore: string | null;
    readonly description: string;
    readonly affectedComponent: string;
    readonly agentId: string | null;
    readonly evidence: readonly RedTeamEvidence[];
    readonly reproduction: readonly string[];
    readonly updatedAtMs: string;
    /** Optional details preserve older findings and partially researched reports. */
    readonly report?: RedTeamFindingReport;
}
/** Pages are pinned to the effort revision, preventing mixed ledger reads. */
export interface RedTeamSnapshot {
    /** Bounded observed native descendants, separate from durable scheduler slots. */
    readonly delegatedAgents?: readonly RedTeamDelegatedAgent[];
    readonly effort: RedTeamEffort;
    readonly agents: readonly RedTeamAgent[];
    readonly tasks: readonly RedTeamTask[];
    readonly findings: readonly RedTeamFinding[];
    readonly nextTaskCursor: string | null;
    readonly nextFindingCursor: string | null;
    /** Recent saved exchanges, ordered by exact sequence rather than browser timing. */
    readonly coordination?: readonly RedTeamCoordinationEvent[];
}
/** Caller-selected effort identities make unacknowledged starts safe to retry server-side. */
export interface RedTeamStartRequest {
    readonly effortId: string;
    readonly title: string;
    readonly source: RedTeamSource;
    readonly rules: string;
    readonly parallelism?: number;
}
/** An effort address resolved under the authenticated principal. */
export interface RedTeamEffortRequest {
    readonly effortId: string;
}
/** Null revision selects the latest snapshot. Continuations must pin its exact revision. */
export interface RedTeamGetRequest extends RedTeamEffortRequest {
    readonly revision: string | null;
    readonly taskCursor: string | null;
    readonly findingCursor: string | null;
}
/** Compare-and-set prevents a delayed update from overwriting a newer owner decision. */
export interface RedTeamUpdateRequest extends RedTeamEffortRequest {
    readonly expectedRevision: string;
    readonly parallelism?: number;
    readonly rules?: string;
}
/** Bounded metadata pagination without agent journals or ledger bodies. */
export interface RedTeamListRequest {
    readonly afterEffortId: string | null;
    readonly limit: number;
}
/** One metadata page with an exclusive continuation cursor. */
export interface RedTeamListPage {
    readonly items: readonly RedTeamEffort[];
    readonly next: string | null;
}
/** Typed red team operation names negotiated by the existing gateway handshake. */
export declare const RedTeamMethod: {
    readonly Start: 'redteam.start';
    readonly List: 'redteam.list';
    readonly Get: 'redteam.get';
    readonly Stop: 'redteam.stop';
    readonly Update: 'redteam.update';
};
/** Supported red team operation discriminator. */
export type RedTeamMethod = (typeof RedTeamMethod)[keyof typeof RedTeamMethod];
