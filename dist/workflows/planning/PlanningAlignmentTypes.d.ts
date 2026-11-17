/** A fingerprint detects graph drift; it never proves a requirement is fulfilled or runnable. */
export interface PlanningRequirementFingerprint {
    readonly id: string;
    readonly hash: string;
}
export interface PlanningGraphFingerprint {
    readonly graphHash: string;
    readonly requirements: readonly PlanningRequirementFingerprint[];
}
/** Server-created semantic anchors for the request and the proposed graph. */
export interface PlanningAlignmentAnchor extends PlanningGraphFingerprint {
    readonly version: 1;
    readonly beforeHash: string;
}
/** Connected steps share a review boundary, including data, flow, and resource edges. */
export interface PlanningSemanticGroup {
    readonly nodeIds: readonly string[];
    readonly value: string;
}
export interface PlanningSignature {
    readonly id: string;
    readonly value: string;
}
export interface PlanningSignatureTargets {
    readonly graph: string;
    readonly requirements: readonly PlanningSignature[];
}
