import type { WorkflowModelEffort } from './ModelEffortTypes.js';
/** Operations available through the workflow model picker. */
export declare const WorkflowModelCapability: {
    readonly Text: 'text';
    readonly Reasoning: 'reasoning';
    readonly Image: 'image';
};
export type WorkflowModelCapability = (typeof WorkflowModelCapability)[keyof typeof WorkflowModelCapability];
/** Discovery never changes a workflow or grants access to another account's resources. */
export interface WorkflowModelsRequest {
    readonly workflowId: string;
    readonly provider: string | null;
    readonly query: string;
    readonly capability: WorkflowModelCapability;
    readonly compatibleOnly: boolean;
    readonly favorites: readonly string[] | null;
    readonly after: string | null;
}
/** Existing ledger rate-card values, represented as decimal text without client-side money math. */
export interface WorkflowModelPrice {
    readonly inputUsdPerMillion: string | null;
    readonly outputUsdPerMillion: string | null;
}
/** Pixel limits for a model that supports custom dimensions. */
export interface WorkflowImageDimensions {
    readonly multiple: number;
    readonly maxEdge: number;
    readonly minPixels: number;
    readonly maxPixels: number;
    readonly maxAspectRatio: number;
    readonly experimentalAbovePixels: number;
}
/** Supported image settings from the same adapter used by execution. */
export interface WorkflowImageCapabilities {
    readonly maxCount: number;
    readonly sizes: readonly string[];
    readonly qualities: readonly string[];
    readonly outputFormats: readonly string[];
    readonly dimensions: WorkflowImageDimensions | null;
    readonly providerOptions: Readonly<Record<string, string>>;
}
/** Public model metadata only: no endpoints, keys, account names, or adapter options. */
export interface WorkflowModelChoice {
    readonly id: string;
    readonly name: string;
    readonly provider: string;
    readonly input: readonly string[];
    readonly reasoning: boolean | null;
    /** Available effort overrides for this model; absent means metadata is unavailable. */
    readonly efforts?: readonly WorkflowModelEffort[];
    readonly source: string;
    readonly status: string;
    readonly compatible: boolean;
    readonly reason: string | null;
    readonly maxOutputTokens: number | null;
    readonly contextWindow: number | null;
    readonly price: WorkflowModelPrice | null;
    /** Null/absent means no explicit endpoint check, rather than proof that a model is absent. */
    readonly availableAtCheck?: boolean | null;
    /** Present only for generation models; token prices do not describe image tariffs. */
    readonly image?: WorkflowImageCapabilities;
}
/** An observation time is not a release date, freshness guarantee, or permission grant. */
export interface WorkflowCatalogObservation {
    readonly checkedAt: string | null;
    readonly refreshAvailable: boolean;
    readonly refreshFailed: boolean;
}
/** Registered providers and a bounded page from the selected provider's maintained catalog. */
export interface WorkflowModelsPage {
    readonly providers: readonly string[];
    readonly items: readonly WorkflowModelChoice[];
    readonly next: string | null;
    /** Legacy marker retained for older clients; endpoint check times are in observation. */
    readonly freshness: 'not-reported';
    /** Optional for older clients. The legacy freshness marker remains unchanged. */
    readonly observation?: WorkflowCatalogObservation;
}
