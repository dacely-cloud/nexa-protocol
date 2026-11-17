import type { WorkflowNode, WorkflowEdge, WorkflowReceipt } from './WorkflowPrimitives.js';
import type { ComponentDefinition, ComponentPort } from './ComponentTypes.js';
/** Layout is deliberately absent from semantic graph validation. */
export interface WorkflowGraph extends WorkflowReceipt {
    readonly nodes: readonly WorkflowNode[];
    readonly edges: readonly WorkflowEdge[];
}
export declare const GraphSeverity: {
    readonly Error: 'error';
    readonly Warning: 'warning';
};
export type GraphSeverity = (typeof GraphSeverity)[keyof typeof GraphSeverity];
export declare const GraphIssueCode: {
    readonly Duplicate: 'duplicate';
    readonly Component: 'component';
    readonly Configuration: 'configuration';
    readonly Endpoint: 'endpoint';
    readonly Connection: 'connection';
    readonly Cardinality: 'cardinality';
    readonly Required: 'required';
    readonly Ambiguous: 'ambiguous';
    readonly Cycle: 'cycle';
    readonly Trigger: 'trigger';
    readonly Unreachable: 'unreachable';
    readonly Resource: 'resource';
    readonly Setup: 'setup';
    readonly Runtime: 'runtime';
};
export type GraphIssueCode = (typeof GraphIssueCode)[keyof typeof GraphIssueCode];
/** Stable identities let all surfaces focus the same problem without parsing its message. */
export interface GraphIssue {
    readonly code: GraphIssueCode;
    readonly severity: GraphSeverity;
    readonly nodeId: string | null;
    readonly edgeId: string | null;
    readonly path: string | null;
    readonly message: string;
}
/** A structural result is never an execution grant or a connection authorization snapshot. */
export interface GraphValidation extends WorkflowReceipt {
    readonly valid: boolean;
    readonly issues: readonly GraphIssue[];
    readonly totalIssues: number;
    readonly truncated: boolean;
    readonly order: readonly string[];
    readonly resourceRequirements: number;
    readonly requiredCapabilities: readonly string[];
    readonly unavailableHandlers: readonly string[];
}
/** Resolved exact definitions used only within one validation pass. */
export interface GraphNode {
    readonly node: WorkflowNode;
    readonly definition: ComponentDefinition;
    readonly ports: ReadonlyMap<string, ComponentPort>;
}
/** Only structurally valid connections participate in dependency analysis. */
export interface GraphConnectionsResult {
    readonly edges: readonly WorkflowEdge[];
    readonly incoming: ReadonlyMap<string, readonly WorkflowEdge[]>;
}
