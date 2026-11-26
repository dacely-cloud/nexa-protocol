// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Lifecycle states for Nexa's delegated workers. */
export const WorkerState = {
    Queued: 'queued',
    Working: 'working',
    Stopping: 'stopping',
    Done: 'done',
    Failed: 'failed',
    Aborted: 'aborted',
    Refused: 'refused',
};
