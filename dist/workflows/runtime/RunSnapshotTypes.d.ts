import type { WorkflowImagePolicyEvidence } from '../ImageModelPolicyTypes.js';
import type { WorkflowModelPolicyEvidence } from '../ModelPolicyTypes.js';
import type { WorkflowModelEffort } from '../ModelEffortTypes.js';
import type { WorkflowScheduleSource } from '../schedule/ScheduleTypes.js';
import type { WorkflowPublicationReference } from '../PublicationTypes.js';
import type { WorkflowGraph } from '../GraphTypes.js';
import type { WorkflowObject } from '../WorkflowPrimitives.js';
/** Resolution uses the selected provider only; policies require their own verified resolver. */
export declare const WorkflowModelSelection: {
    readonly Exact: 'exact';
    readonly Latest: 'latest-compatible';
};
/** Immutable provider identity and price reference captured before acceptance. Never contains credentials. */
export interface WorkflowResolvedModel {
    readonly nodeId: string;
    readonly bindingId: string;
    readonly provider: string;
    readonly model: string;
    readonly selection: (typeof WorkflowModelSelection)[keyof typeof WorkflowModelSelection];
    readonly policy?: WorkflowModelPolicyEvidence;
    readonly capability: WorkflowTextCapability;
    readonly maxOutputTokens: number;
    /** Selected effort pinned with this model; absent means the provider default. */
    readonly effort?: WorkflowModelEffort;
    /** Digest of the existing ledger rate card; null means unpriced. */
    readonly pricingReference: string | null;
}
/** The image operation is part of immutable settings and pricing identity. */
export declare const WorkflowImageOperation: {
    readonly Generate: 'generate';
    readonly Edit: 'edit';
};
/** Supported image operations, independent of server-only provider code. */
export type WorkflowImageOperation = (typeof WorkflowImageOperation)[keyof typeof WorkflowImageOperation];
/** An exact request, bounded before admission and independent of a text model binding. */
export interface WorkflowImageSettings {
    /** Older generation-only snapshots omit this field. */
    readonly operation?: WorkflowImageOperation;
    readonly size: string;
    readonly quality: string;
    readonly count: number;
    readonly outputFormat: string;
    readonly options: Readonly<Record<string, string | number | boolean>>;
}
/** Per-operation settings sharing one reusable image-model binding. */
export interface WorkflowImageRequirement {
    readonly nodeId: string;
    readonly settings: WorkflowImageSettings;
}
/** Image request identity and its configured account tariff. */
export interface WorkflowImagePrice {
    readonly provider: string;
    readonly model: string;
    readonly settings: WorkflowImageSettings;
    readonly capabilityReference: string;
    readonly pricingReference: string;
    readonly priceServiceId: string;
    readonly estimatedMicrocents: string;
}
/** Immutable run bindings retain the exact request and price selected at acceptance. */
export interface WorkflowResolvedImage extends WorkflowImagePrice {
    readonly nodeId: string;
    readonly bindingId: string;
    readonly capability: 'image';
    readonly selection: (typeof WorkflowModelSelection)[keyof typeof WorkflowModelSelection];
    readonly policy?: WorkflowImagePolicyEvidence;
}
export declare const WorkflowRunMode: {
    readonly LiveTest: 'live-test';
    readonly MockTest: 'mock-test';
    readonly Published: 'published';
};
export type WorkflowRunMode = (typeof WorkflowRunMode)[keyof typeof WorkflowRunMode];
/** Immutable semantic snapshot; no canvas layout, credentials, or mutable draft pointer. */
export interface WorkflowRunSnapshot {
    /** The submitting account approved unattended execution of this exact immutable snapshot. */
    readonly accountAuthorization?: true;
    /** Present only on scheduled published runs. */
    readonly schedule?: WorkflowScheduleSource;
    readonly publication?: WorkflowPublicationReference;
    /** Image settings and prices resolved by the host before acceptance. */
    readonly imageModels?: readonly WorkflowResolvedImage[];
    /** Host-resolved exact bindings pinned before acceptance; absent on deterministic runs. */
    readonly models?: readonly WorkflowResolvedModel[];
    readonly format: 1;
    readonly graph: WorkflowGraph;
    readonly triggerNodeId: string;
    readonly mode: WorkflowRunMode;
    readonly input: WorkflowObject;
    readonly maxConcurrency: number;
    readonly timeoutMs: string;
}
/** Required operation capabilities for the text handler. */
export declare const WorkflowTextCapability: {
    readonly Text: 'text';
    readonly Reasoning: 'reasoning';
};
/** A supported text operation. */
export type WorkflowTextCapability = (typeof WorkflowTextCapability)[keyof typeof WorkflowTextCapability];
