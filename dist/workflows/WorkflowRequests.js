// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Bounded draft transport. Large writes require a separate staged-upload capability. */
export const WorkflowGatewayLimits = {
    patchBytes: 1_048_576,
    textChunkCharacters: 65_536,
    recordBatch: 32,
    recordBatchChunkCharacters: 2048,
    manifestNodes: 128,
    manifestEdges: 256,
    manifestGroups: 128,
};
