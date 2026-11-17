// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Exact invocation identity; the authenticated principal is never supplied by clients. */
export interface WorkflowHumanIdentity {
    readonly runId: string;
    readonly nodeId: string;
    readonly invocationId: string;
}
