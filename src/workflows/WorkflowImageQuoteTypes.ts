// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { WorkflowImageSettings } from './runtime/RunSnapshotTypes.js';

/** Unsaved render settings may be priced only in an owned workflow. */
export interface WorkflowImageQuoteRequest {
    readonly workflowId: string;
    readonly nodeId: string;
    readonly provider: string;
    readonly model: string;
    readonly settings: WorkflowImageSettings;
}
/** An estimate creates no reservation and is recalculated when accepting a run. */
export interface WorkflowImageQuote extends WorkflowImageQuoteRequest {
    readonly estimatedMicrocents: string;
    readonly capabilityReference: string;
    readonly pricingReference: string;
    readonly quotedAtMs: string;
}
