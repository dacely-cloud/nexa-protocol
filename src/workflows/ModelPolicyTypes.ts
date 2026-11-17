// SPDX-License-Identifier: LicenseRef-Proprietary

/** Features that integrations can explicitly verify for model selection. */
export const WorkflowModelFeature = {
    Reasoning: 'reasoning',
    Vision: 'vision',
    Documents: 'documents',
    Tools: 'tools',
    StructuredOutput: 'structuredOutput',
} as const;
export type WorkflowModelFeature = (typeof WorkflowModelFeature)[keyof typeof WorkflowModelFeature];

/** Saved, explicit constraints for the latest supported model on one provider. */
export interface WorkflowModelPolicy {
    readonly allowPreview: boolean;
    readonly region: string | null;
    readonly requiredFeatures: readonly WorkflowModelFeature[];
    /** Decimal USD per million tokens. Null is no additional rate ceiling. */
    readonly maxInputUsdPerMillion: string | null;
    readonly maxOutputUsdPerMillion: string | null;
    readonly allowUnpriced: boolean;
    /** Endpoint observation age, between one second and one day. */
    readonly maxCatalogAgeMs: string;
}

/** The facts and constraints used for one immutable latest-policy decision. */
export interface WorkflowModelPolicyEvidence {
    readonly format: 1;
    readonly policy: WorkflowModelPolicy;
    readonly catalogCheckedAtMs: string;
    readonly releaseAtMs: string;
    readonly releaseReference: string;
    readonly eligibilityVerifiedAtMs: string;
    readonly eligibilityReference: string;
    readonly capabilityDigest: string;
}
