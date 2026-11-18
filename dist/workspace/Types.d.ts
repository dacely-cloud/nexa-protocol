/**
 * Workspaces: the isolated filesystem an agent's tools operate in.
 *
 * The requirement is that the agent can create a separate workspace on request. What makes that
 * more than `mkdir` is the isolation contract: every filesystem tool is bound to exactly one
 * workspace root, so two agents working for two customers cannot see each other's files even by
 * accident — and in shared-agent mode, cannot see each other's files even deliberately.
 */
/** How a workspace came to exist, which decides how it is cleaned up. */
export declare const WorkspaceKind: {
    /** An existing directory the user pointed at. NEVER deleted by Nexa. */
    readonly Attached: 'attached';
    /** Created by Nexa for a task. Deletable. */
    readonly Managed: 'managed';
    /** Created for one session and removed when it ends. */
    readonly Ephemeral: 'ephemeral';
};
/** One workspace kind. */
export type WorkspaceKind = (typeof WorkspaceKind)[keyof typeof WorkspaceKind];
/**
 * Where a workspace is in its life.
 *
 * The states exist because destruction is not instantaneous and must not be silent. A workspace
 * holds the user's work, so "delete it" has to pass through a phase where a run that is still
 * writing can stop it (`draining`), and a phase that survives a crash so the next start can finish
 * the job instead of finding a half-emptied tree behind a record that still says `active`
 * (`destroying`). `expired` is the grace state: a user who comes back a week after a task
 * workspace's TTL sees "this expired, here is how to keep it" rather than a vanished directory.
 */
export declare const WorkspaceState: {
    /** The root and the record exist; the seed, clone or quota check has not finished. */
    readonly Creating: 'creating';
    readonly Active: 'active';
    /** Past its TTL. Still readable and still on disk; eligible for collection after the grace. */
    readonly Expired: 'expired';
    /** A destroy was asked for and a live lease is still holding it. */
    readonly Draining: 'draining';
    /** The tree is being removed. A crash here is resumed by the next reap. */
    readonly Destroying: 'destroying';
    /** The tree is gone; the record is kept as a tombstone so the audit trail has an end. */
    readonly Destroyed: 'destroyed';
};
/** One workspace lifecycle state. */
export type WorkspaceState = (typeof WorkspaceState)[keyof typeof WorkspaceState];
/**
 * The ceilings a workspace's contents may not pass.
 *
 * Both are OPTIONAL and both default to absent, which means unbounded. That is deliberate and it is
 * the opposite of what the plan's "2 GiB by default" says: a user who tells the agent to clone a
 * 10 GB monorepo into a workspace has asked for exactly that, and a default ceiling would refuse
 * the user's own instruction with an error about a limit they never chose. A quota here is a
 * runaway guard an operator sets on a shared deployment, or a bound a caller puts on one specific
 * workspace — never a product limit that arrives by omission.
 */
export interface WorkspaceQuota {
    /** Byte ceiling for the tree. Absent means unbounded. */
    readonly maxBytes?: number;
    /** File-count ceiling. Absent means unbounded — a million tiny files is invisible to a byte quota. */
    readonly maxFiles?: number;
}
/** What a workspace currently holds, and when that was last measured against the disk. */
export interface WorkspaceUsage {
    readonly bytes: number;
    readonly files: number;
    /**
     * When a full walk last corrected these numbers. `0` means never — the counters are then a
     * lower bound built from writes this process saw, which is honest but not authoritative.
     */
    readonly reconciledAt: number;
}
/**
 * One run's claim on a workspace, as stored in the record.
 *
 * Durable rather than in-process, because the process holding the lease and the process asked to
 * destroy the workspace are routinely different ones — a gateway serving a conversation and a CLI
 * running `nexa workspace destroy`. An in-memory lease would be invisible to exactly the caller it
 * has to stop. `expiresAt` is what keeps a crashed run from pinning a workspace forever: a lease
 * nobody heartbeats stops counting on its own.
 */
export interface WorkspaceLeaseRecord {
    readonly runId: string;
    readonly acquiredAt: number;
    readonly expiresAt: number;
}
/** Persisted assignment binding contains no transport credentials or controller filesystem paths. */
export interface WorkspaceStorageIdentity {
    /** Opaque stable identity of the assigned host and workspace base. */
    readonly id: string;
    readonly root: string;
}
/** An isolated place an agent works. */
export interface Workspace {
    readonly id: string;
    /** A human name, e.g. `acme-migration`. */
    readonly name: string;
    readonly kind: WorkspaceKind;
    /** The absolute root. Every tool bound to this workspace is confined here. */
    readonly root: string;
    /** Present for assigned-host projects; legacy/native records cannot silently adopt a VM. */
    readonly storage?: WorkspaceStorageIdentity;
    readonly createdAt: number;
    readonly updatedAt: number;
    /** Actual project use, independent of expiry and usage maintenance. */
    readonly lastUsedAtMs?: string;
    /** Who may use it. Absent means the deployment's default policy decides. */
    readonly owner?: WorkspaceOwner;
    /** Additional roots tools may also reach (a shared cache, a read-only reference checkout). */
    readonly extraRoots?: readonly string[];
    /** Free-form labels. */
    readonly tags?: readonly string[];
    /** When an ephemeral workspace should be reaped. */
    readonly expiresAt?: number;
    /**
     * Where it is in its lifecycle.
     *
     * Optional because records written before the lifecycle existed do not carry it, and those
     * records are on disk in every install that already made a workspace. Read it through
     * {@link stateOf}, which supplies the only truthful default for such a record: it was created
     * and it was never being destroyed, because the old destroy path deleted the row outright.
     */
    readonly state?: WorkspaceState;
    /** Ceilings for this workspace's contents. Absent means unbounded — see {@link WorkspaceQuota}. */
    readonly quota?: WorkspaceQuota;
    /** Last known contents. Read through {@link usageOf}, which defaults a legacy record to zero. */
    readonly usage?: WorkspaceUsage;
    /** Runs currently holding it. Read through {@link activeLeases}, which drops expired ones. */
    readonly leases?: readonly WorkspaceLeaseRecord[];
    /** When the tree was removed. Present exactly on a tombstone. */
    readonly destroyedAt?: number;
    /**
     * Set when this workspace IS a git worktree, so destroy unregisters it rather than deleting it.
     *
     * Recorded on the workspace because destroy has to know: removing the directory of a worktree
     * leaves its registration in the source repository's `.git/worktrees`, and the branch stays
     * checked-out-somewhere forever with the name unusable.
     */
    readonly worktree?: {
        readonly repo: string;
        readonly branch: string;
        readonly deleteBranchOnDestroy?: boolean;
    };
}
/** Who a workspace belongs to. */
export interface WorkspaceOwner {
    readonly userId?: string;
    readonly agentId?: string;
    readonly projectId?: string;
}
/** Finite account-owned workspace discovery; omitted rows still advance the cursor. */
export interface WorkspacePage {
    readonly entries: readonly Workspace[];
    /** Latest owned conversation titles for only this page, never a history snapshot. */
    readonly titles?: readonly WorkspaceProjectTitle[];
    readonly nextCursor: string | null;
    /** Present only when the server verified candidate roots in a confined native batch. */
    readonly presence?: readonly WorkspaceProjectPresence[];
}
/** Root visibility is metadata only; uncertainty never becomes a negative classification. */
export declare const WorkspacePresenceState: {
    readonly Nonempty: 'nonempty';
    readonly Empty: 'empty';
    readonly Unknown: 'unknown';
};
/** Finite root-presence states shared with the native batch helper. */
export type WorkspacePresenceState = (typeof WorkspacePresenceState)[keyof typeof WorkspacePresenceState];
/** A confirmed host mismatch is distinct from uncertain directory visibility. */
export declare const WorkspacePresenceUnavailableReason: {
    readonly MachineAssignment: 'machine-assignment';
};
/** Only host authorization may classify an unavailable project assignment. */
export type WorkspacePresenceUnavailableReason = (typeof WorkspacePresenceUnavailableReason)[keyof typeof WorkspacePresenceUnavailableReason];
/** A result retains the storage assignment that authorized its observation. */
export interface WorkspaceProjectPresence {
    readonly workspaceId: string;
    readonly state: WorkspacePresenceState;
    readonly assignment: string;
    readonly modifiedAtNs: string;
    /** Does not classify files as empty or disclose another host's paths. */
    readonly unavailableReason?: WorkspacePresenceUnavailableReason;
}
/** A friendly project label reveals no transcript or unrelated conversation metadata. */
export interface WorkspaceProjectTitle {
    readonly workspaceId: string;
    readonly title: string;
}
