/** Value-free DOM tag and accessibility role counts. */
export interface BrowserStructureCount {
    readonly name: string;
    readonly count: string;
}
/** Bounded structure coverage does not imply that page text or earlier activity was inspected. */
export interface BrowserStructureProjection {
    readonly available: boolean;
    readonly nodes: string;
    readonly partial: boolean;
    readonly counts: readonly BrowserStructureCount[];
    readonly countPreviewPartial: boolean;
}
/** One passive structure inspection tied to a stable selected document. */
export interface BrowserPageProjection {
    readonly provider: 'cdp-passive';
    readonly targetId: string;
    readonly frameId: string;
    readonly url: string;
    readonly origin: string;
    readonly capturedAt: string;
    readonly priorActivityAvailable: false;
    readonly dom: BrowserStructureProjection;
    readonly accessibility: BrowserStructureProjection;
    readonly limitations: readonly string[];
}
