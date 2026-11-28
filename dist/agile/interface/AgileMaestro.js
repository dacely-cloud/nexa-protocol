// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * The agile level a node of a Maestro run's task tree is shown at, decided by its depth.
 *
 * @remarks
 * The run itself is the epic, each top-level subtask is a story, and every deeper subtask is a task
 * that names the story or task it refines, so the hierarchy has no depth limit.
 */
export const AgileMaestroLevel = {
    /** The run: the lead Maestro's whole task. Its node id is the run id. */
    Epic: 'epic',
    /** A top-level subtask of the run. */
    Story: 'story',
    /** A subtask of a story or of another task, at any depth. */
    Task: 'task',
};
/** What the conversation's owner can ask Maestro to do with one node of a running task tree. */
export const AgileMaestroActionKind = {
    /** Run the node again with a fresh attempt. */
    Retry: 'retry',
    /** Do not run the node, or stop it, and continue without it. */
    Skip: 'skip',
    /** Do the node's work with this model and, optionally, this reasoning effort. */
    Pin: 'pin',
    /** Add an instruction to the node's brief. */
    Instruct: 'instruct',
    /** Split the node into subtasks again, optionally with guidance. */
    Resplit: 'resplit',
    /** Stop the sub-agent working the node now. */
    Cancel: 'cancel',
};
/** Where a board action is. */
export const AgileMaestroActionState = {
    /** Waiting for the next point where Maestro can safely apply it. */
    Pending: 'pending',
    Applied: 'applied',
    /** It no longer applied; the note says why. */
    Rejected: 'rejected',
};
