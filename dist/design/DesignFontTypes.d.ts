/** Font containers are identified from validated bytes rather than a filename extension. */
export declare const DesignFontFormat: {
    readonly Ttf: 'ttf';
    readonly Otf: 'otf';
    readonly Woff: 'woff';
    readonly Woff2: 'woff2';
};
/** Supported standalone font container. */
export type DesignFontFormat = (typeof DesignFontFormat)[keyof typeof DesignFontFormat];
/** Font libraries and transfers have independent, bounded storage budgets. */
export declare class DesignFontLimits {
    /** Each read returns at most one acknowledged binary slice. */
    static readonly chunkBytes: number;
    /** One standalone font can occupy at most 16 MiB. */
    static readonly fileBytes: bigint;
    /** All published fonts belonging to one owner share this ledger. */
    static readonly ownerBytes: bigint;
    /** A library cannot accumulate an unbounded number of tiny records. */
    static readonly ownerCount: number;
}
/** Immutable font identity and a declared family/style binding; source bytes are never model output. */
export interface DesignFontAsset {
    readonly id: string;
    readonly family: string;
    readonly weight: number;
    readonly italic: boolean;
    readonly format: DesignFontFormat;
    readonly byteLength: string;
    readonly sha256: string;
}
/** Saved text pins one immutable owner-scoped font identity and its exact original bytes. */
export interface DesignFontBinding {
    readonly id: string;
    readonly sha256: string;
}
/** Only the host can authorize the workspace path and select the owning principal. */
export interface DesignFontImportRequest {
    readonly id: string;
    readonly family: string;
    readonly weight: number;
    readonly italic: boolean;
    readonly path: string;
}
/** Library browsing carries metadata, with a stable lexicographic cursor. */
export interface DesignFontListRequest {
    readonly after: string | null;
    readonly limit: number;
}
/** Published fonts are reusable across the current owner's agents and reopened workspaces. */
export interface DesignFontListPage {
    readonly items: readonly DesignFontAsset[];
    readonly nextAfter: string | null;
}
/** Font byte reads address one exact, bounded slice of an immutable identity. */
export interface DesignFontReadRequest {
    readonly id: string;
    readonly offset: string;
}
/** Byte transport is separate from metadata discovery and never included in an agent receipt. */
export interface DesignFontSlice {
    readonly font: DesignFontAsset;
    readonly offset: string;
    readonly data: string;
    readonly nextOffset: string | null;
}
/** Authenticated metadata discovery does not carry font bodies. */
export interface DesignFontListMethod {
    readonly params: DesignFontListRequest;
    readonly result: DesignFontListPage;
}
/** Each authenticated WebSocket read transfers one independently bounded immutable slice. */
export interface DesignFontReadMethod {
    readonly params: DesignFontReadRequest;
    readonly result: DesignFontSlice;
}
/** A caller supplies authorized font bytes, never a process-global filesystem path. */
export interface DesignFontSource {
    /** Only deliberate public or authorized fallback sources participate in missing-grapheme resolution. */
    readonly fallback?: boolean;
    readonly binding?: DesignFontBinding;
    readonly family: string;
    readonly italic: boolean;
    readonly weight: number;
    readonly bytes: Uint8Array;
}
/** The actual face range supplies the same weight contract to shaping and browser registration. */
export interface DesignFontWeightRange {
    readonly minimum: number;
    readonly maximum: number;
}
/** Exact vertical font-cell dimensions in the requested style's design pixels. */
export interface DesignFontMetrics {
    readonly ascent: number;
    readonly descent: number;
}
