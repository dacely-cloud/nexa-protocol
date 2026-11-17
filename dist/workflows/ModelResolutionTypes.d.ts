import type { WorkflowModelPolicy, WorkflowModelPolicyEvidence } from './ModelPolicyTypes.js';
import { WorkflowModelCapability, type WorkflowModelChoice } from './WorkflowModelTypes.js';
/** Owner-authorized policy preview; never saves a draft or performs inference. */
export interface WorkflowModelResolutionRequest {
    readonly workflowId: string;
    readonly provider: string;
    readonly capability: Exclude<WorkflowModelCapability, typeof WorkflowModelCapability.Image>;
    readonly maxOutputTokens: number;
    readonly policy: WorkflowModelPolicy;
}
export interface WorkflowModelResolution {
    readonly candidate: WorkflowModelChoice | null;
    readonly evidence: WorkflowModelPolicyEvidence | null;
    readonly reason: string | null;
}
