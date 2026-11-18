// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * Workspaces: the isolated filesystem an agent's tools operate in.
 *
 * The requirement is that the agent can create a separate workspace on request. What makes that
 * more than `mkdir` is the isolation contract: every filesystem tool is bound to exactly one
 * workspace root, so two agents working for two customers cannot see each other's files even by
 * accident — and in shared-agent mode, cannot see each other's files even deliberately.
 */
/** How a workspace came to exist, which decides how it is cleaned up. */
export const WorkspaceKind = {
    /** An existing directory the user pointed at. NEVER deleted by Nexa. */
    Attached: 'attached',
    /** Created by Nexa for a task. Deletable. */
    Managed: 'managed',
    /** Created for one session and removed when it ends. */
    Ephemeral: 'ephemeral',
};
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
export const WorkspaceState = {
    /** The root and the record exist; the seed, clone or quota check has not finished. */
    Creating: 'creating',
    Active: 'active',
    /** Past its TTL. Still readable and still on disk; eligible for collection after the grace. */
    Expired: 'expired',
    /** A destroy was asked for and a live lease is still holding it. */
    Draining: 'draining',
    /** The tree is being removed. A crash here is resumed by the next reap. */
    Destroying: 'destroying',
    /** The tree is gone; the record is kept as a tombstone so the audit trail has an end. */
    Destroyed: 'destroyed',
};
/** Root visibility is metadata only; uncertainty never becomes a negative classification. */
export const WorkspacePresenceState = {
    Nonempty: 'nonempty',
    Empty: 'empty',
    Unknown: 'unknown',
};
/** A confirmed host mismatch is distinct from uncertain directory visibility. */
export const WorkspacePresenceUnavailableReason = {
    MachineAssignment: 'machine-assignment',
};
