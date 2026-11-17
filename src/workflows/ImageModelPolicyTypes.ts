// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Image policies bound each complete render; token rate ceilings do not apply to image tariffs. */
export interface WorkflowImagePolicy {
    readonly allowPreview: boolean;
    readonly region: string | null;
    readonly maxCatalogAgeMs: string;
    /** Null retains the existing run budget. A value additionally caps each image operation. */
    readonly maxGenerationMicrocents: string | null;
}

/** Immutable evidence for a concrete image model selected at run creation. */
export interface WorkflowImagePolicyEvidence {
    readonly format: 1;
    readonly policy: WorkflowImagePolicy;
    readonly catalogCheckedAtMs: string;
    readonly releaseAtMs: string;
    readonly releaseReference: string;
    readonly eligibilityVerifiedAtMs: string;
    readonly eligibilityReference: string;
    readonly factsDigest: string;
}
