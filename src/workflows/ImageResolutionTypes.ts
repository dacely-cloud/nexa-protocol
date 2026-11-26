// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { WorkflowImagePolicy, WorkflowImagePolicyEvidence } from './ImageModelPolicyTypes.js';
import type { WorkflowImageQuote } from './WorkflowImageQuoteTypes.js';
import type { WorkflowImageRequirement } from './runtime/RunSnapshotTypes.js';

/** A read-only policy preview uses unsaved settings and authenticated account pricing. */
export interface WorkflowImageResolutionRequest {
    readonly workflowId: string;
    readonly provider: string;
    readonly policy: WorkflowImagePolicy;
    readonly requirements: readonly WorkflowImageRequirement[];
}
/** All connected render quotes share the selected snapshot and its evidence. */
export interface WorkflowImageCandidate {
    readonly provider: string;
    readonly model: string;
    readonly evidence: WorkflowImagePolicyEvidence;
    readonly quotes: readonly WorkflowImageQuote[];
}
/** An unresolved policy has a reason, never an invented candidate or zero-price placeholder. */
export interface WorkflowImageResolution {
    readonly candidate: WorkflowImageCandidate | null;
    readonly reason: string | null;
}
