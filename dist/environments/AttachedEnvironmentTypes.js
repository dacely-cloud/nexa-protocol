// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * Environments an API client attaches to its own gateway connection.
 *
 * @remarks
 * A client that owns a sandbox, a container or a build machine can lend it to its turns: it
 * attaches the environment, names it in a turn's `attachedEnvironments`, and answers each
 * `environment.request` event with `environments.respond`. The environment lives as long as the
 * connection that attached it, and only that connection's turns can use it. Nexa never widens
 * what the client chooses to execute: every operation is the client's to run or refuse.
 */
/** Operating systems an attached environment can report. */
export const AttachedEnvironmentPlatform = {
    Linux: 'linux',
    Windows: 'windows',
    Macos: 'macos',
};
/** Why an operation failed. */
export const AttachedEnvironmentErrorCode = {
    NotFound: 'not-found',
    Denied: 'denied',
    Failed: 'failed',
};
