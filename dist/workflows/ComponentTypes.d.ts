import type { ValueSchema, ObjectSchema } from './SchemaTypes.js';
import type { WorkflowEdgeKind, WorkflowObject } from './WorkflowPrimitives.js';
import type { ResourceFamily, ResourceUse } from './ResourceTypes.js';
/** The four authoring roles have different scheduling semantics. */
export declare const ComponentRole: {
    readonly Trigger: 'trigger';
    readonly Step: 'step';
    readonly Resource: 'resource';
    readonly Visual: 'visual';
};
export type ComponentRole = (typeof ComponentRole)[keyof typeof ComponentRole];
/** Catalog grouping retains all requested capability areas without declaring runtime support. */
export declare const ComponentCategory: {
    readonly Triggers: 'triggers';
    readonly Connections: 'connections';
    readonly Api: 'api';
    readonly Transform: 'transform';
    readonly Conditions: 'conditions';
    readonly Flow: 'flow';
    readonly Time: 'time';
    readonly Agents: 'agents';
    readonly Prompts: 'prompts';
    readonly Models: 'models';
    readonly Context: 'context';
    readonly Research: 'research';
    readonly Tools: 'tools';
    readonly Programs: 'programs';
    readonly Browser: 'browser';
    readonly Media: 'media';
    readonly Documents: 'documents';
    readonly Messaging: 'messaging';
    readonly Storage: 'storage';
    readonly Teams: 'teams';
    readonly Planning: 'planning';
    readonly Human: 'human';
    readonly Quality: 'quality';
    readonly Cache: 'cache';
    readonly Policy: 'policy';
    readonly Output: 'output';
    readonly Utilities: 'utilities';
    readonly Resources: 'resources';
    readonly Observability: 'observability';
    readonly Entities: 'entities';
    readonly Experiments: 'experiments';
    readonly Collection: 'collection';
};
export type ComponentCategory = (typeof ComponentCategory)[keyof typeof ComponentCategory];
export declare const PortDirection: {
    readonly Input: 'input';
    readonly Output: 'output';
};
export type PortDirection = (typeof PortDirection)[keyof typeof PortDirection];
export declare const PortCardinality: {
    readonly Item: 'item';
    readonly List: 'list';
    readonly Stream: 'stream';
};
export type PortCardinality = (typeof PortCardinality)[keyof typeof PortCardinality];
/** Multiple inputs require an explicit collector or join. Last-writer-wins is not an option. */
export declare const IncomingPolicy: {
    readonly Reject: 'reject';
    readonly Collect: 'collect';
    readonly Join: 'join';
};
export type IncomingPolicy = (typeof IncomingPolicy)[keyof typeof IncomingPolicy];
/** Literal inputs and wire inputs share one schema; connecting both is ambiguous and rejected. */
export interface ComponentPort {
    readonly id: string;
    readonly label: string;
    readonly direction: PortDirection;
    readonly kind: WorkflowEdgeKind;
    readonly schema: ValueSchema;
    readonly cardinality: PortCardinality;
    readonly required: boolean;
    readonly maxConnections: number;
    readonly incoming: IncomingPolicy;
    readonly literalField: string | null;
    /** Authoring hint; runtime must still verify the provider's actual supported operations. */
    readonly modelCapabilities?: readonly string[];
}
/** Inline resource bindings have the same capability requirements as exposed resource cards. */
export interface ComponentResourceSlot {
    readonly family: ResourceFamily;
    readonly uses: readonly ResourceUse[];
}
export declare const ComponentEffect: {
    readonly Pure: 'pure';
    readonly Inference: 'inference';
    readonly External: 'external';
    readonly Wait: 'wait';
};
export type ComponentEffect = (typeof ComponentEffect)[keyof typeof ComponentEffect];
export declare const MockBehavior: {
    readonly Deterministic: 'deterministic';
    readonly Fixture: 'fixture';
    readonly None: 'none';
};
export type MockBehavior = (typeof MockBehavior)[keyof typeof MockBehavior];
/** Runtime availability is explicit; a schema definition alone cannot authorize or execute work. */
export interface ComponentExecution {
    readonly handler: string | null;
    readonly effect: ComponentEffect;
    readonly timeoutMs: string;
    readonly maxAttempts: number;
    readonly retryErrors: readonly string[];
    readonly permissions: readonly string[];
    readonly capabilities: readonly string[];
    readonly mock: MockBehavior;
    readonly streaming: boolean;
    readonly cancellation: string;
    readonly persistence: string;
    readonly credits: string;
}
/** Declarative presentation hints support family-specific cards without coupling contracts to React. */
export interface ComponentDisplay {
    readonly title: string;
    readonly description: string;
    readonly example: string;
    readonly tags: readonly string[];
    readonly card: string;
    readonly accent: string;
    readonly compactFields: readonly string[];
    readonly inspectorFields: readonly string[];
}
/** Registry version is pinned in every saved node. Runtime and UI share this exact definition. */
export interface ComponentDefinition {
    readonly id: string;
    readonly version: string;
    readonly role: ComponentRole;
    readonly category: ComponentCategory;
    readonly display: ComponentDisplay;
    readonly configuration: ObjectSchema;
    readonly defaults: WorkflowObject;
    readonly ports: readonly ComponentPort[];
    readonly resources: readonly ComponentResourceSlot[];
    readonly execution: ComponentExecution | null;
    readonly resourceRole: string | null;
    /** Present only on external resource cards, distinct from account or editor workspaces. */
    readonly externalFamily?: ResourceFamily;
    /** Older versions requiring explicit migrations; no silent rewrite is permitted. */
    readonly migratesFrom: readonly string[];
}
