import type { WorkflowDetails, WorkflowNode, WorkflowPosition, WorkflowEdge, WorkflowReceipt } from './WorkflowPrimitives.js';
import type { WorkflowPublicationReference } from './PublicationTypes.js';
import type { WorkflowGroup, WorkflowGroupReference } from './WorkflowGroupTypes.js';
/** A bounded edit; layout changes never include node configuration. */
export interface WorkflowPatch {
    /** Present together on hierarchy-aware edits; omission denotes a legacy writer. */
    readonly groups?: readonly WorkflowGroup[];
    readonly removeGroups?: readonly string[];
    readonly details: WorkflowDetails | null;
    readonly nodes: readonly WorkflowNode[];
    readonly positions: readonly WorkflowPosition[];
    readonly edges: readonly WorkflowEdge[];
    readonly removeNodes: readonly string[];
    readonly removeEdges: readonly string[];
}
/** Small management projection; contains no graph, prompts, or run histories. */
export interface WorkflowSummary extends WorkflowReceipt {
    readonly publication?: WorkflowPublicationReference;
    readonly details: WorkflowDetails;
    readonly createdAtMs: string;
    readonly updatedAtMs: string;
    readonly nodeCount: number;
    readonly edgeCount: number;
}
/** Record families share bounded storage while preserving typed reads. */
export declare const WorkflowRecordKind: {
    readonly Node: 'node';
    readonly Position: 'position';
    readonly Edge: 'edge';
    readonly Group: 'group';
};
/** Stored graph record family. */
export type WorkflowRecordKind = (typeof WorkflowRecordKind)[keyof typeof WorkflowRecordKind];
/** One node's immutable content and independently versioned layout. */
export interface WorkflowNodeReference {
    readonly id: string;
    readonly content: string;
    readonly position: string;
}
/** One immutable connection. */
export interface WorkflowEdgeReference {
    readonly id: string;
    readonly content: string;
}
/** Immutable revision manifest. Large manifests themselves use bounded payload storage. */
export interface WorkflowManifest extends WorkflowReceipt {
    readonly groups?: readonly WorkflowGroupReference[];
    readonly format: 1;
    readonly details: WorkflowDetails;
    readonly nodes: readonly WorkflowNodeReference[];
    readonly edges: readonly WorkflowEdgeReference[];
}
/** Cursor uses a timestamp plus stable identity to handle equal update times. */
export interface WorkflowListCursor {
    readonly updatedAtMs: string;
    readonly workflowId: string;
}
/** Bounded management page. */
export interface WorkflowListPage {
    readonly items: readonly WorkflowSummary[];
    readonly next: WorkflowListCursor | null;
}
/** Decoded values for bounded editor or executor reads. */
export interface WorkflowReadNode {
    readonly reference: string;
    readonly kind: typeof WorkflowRecordKind.Node;
    readonly value: WorkflowNode;
}
/** Decoded layout contains no execution configuration. */
export interface WorkflowReadPosition {
    readonly reference: string;
    readonly kind: typeof WorkflowRecordKind.Position;
    readonly value: WorkflowPosition;
}
/** Decoded edge retains its declared semantic kind. */
export interface WorkflowReadEdge {
    readonly reference: string;
    readonly kind: typeof WorkflowRecordKind.Edge;
    readonly value: WorkflowEdge;
}
/** Decoded group layout contains no run state or executable configuration. */
export interface WorkflowReadGroup {
    readonly reference: string;
    readonly kind: typeof WorkflowRecordKind.Group;
    readonly value: WorkflowGroup;
}
/** The reader can select only the record families it needs. */
export type WorkflowReadRecord = WorkflowReadNode | WorkflowReadPosition | WorkflowReadEdge | WorkflowReadGroup;
/** Preserve the existing portable module entry while contracts have an independent owner. */
export { WorkflowEdgeKind } from './WorkflowPrimitives.js';
export type { WorkflowObject, WorkflowValue, WorkflowDetails, WorkflowNode, WorkflowPosition, WorkflowEndpoint, WorkflowEdge, WorkflowReceipt, } from './WorkflowPrimitives.js';
