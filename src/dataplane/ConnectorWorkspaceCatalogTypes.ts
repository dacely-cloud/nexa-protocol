// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ConnectorFileMode } from './ConnectorFileMode.js';

/** A verified catalog offers exact mapping choices without granting any operation. */
export interface ConnectorWorkspaceCatalogEntry {
    readonly fileRootId: string;
    readonly executionRootId: string;
    readonly filePolicySha256: string;
    readonly executionPolicySha256: string;
    readonly access: ConnectorFileMode;
    readonly bindingRevision: string;
    readonly bindingSha256: string;
    readonly descriptorSha256: string;
}

/** The environment is part of the immutable selected target, never a transport address. */
export interface ConnectorWorkspaceJointTarget extends ConnectorWorkspaceCatalogEntry {
    readonly environmentId: string;
}

/** Only safe summaries leave Nexa; private SDK signatures, keys and routing remain private. */
export interface ConnectorWorkspaceCatalogView {
    readonly environmentId: string;
    readonly entries: readonly ConnectorWorkspaceCatalogEntry[];
}
