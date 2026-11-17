// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Record families share bounded storage while preserving typed reads. */
export const WorkflowRecordKind = {
    Node: 'node',
    Position: 'position',
    Edge: 'edge',
    Group: 'group',
};
/** Preserve the existing portable module entry while contracts have an independent owner. */
export { WorkflowEdgeKind } from './WorkflowPrimitives.js';
