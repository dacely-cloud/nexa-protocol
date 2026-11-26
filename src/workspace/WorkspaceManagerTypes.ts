// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { Workspace, WorkspaceLeaseRecord, WorkspaceState, WorkspaceUsage } from './Types.js';

/** A workspace plus the lifecycle facts a caller has to see to make a decision about it. */
export interface WorkspaceDescription extends Workspace {
    readonly state: WorkspaceState;
    readonly usage: WorkspaceUsage;
    /** Only the leases still counting; expired ones are not shown because they hold nothing. */
    readonly leases: readonly WorkspaceLeaseRecord[];
}
