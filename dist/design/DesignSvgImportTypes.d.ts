/** Native SVG import creates one editable artboard without sending existing document bodies. */
export interface DesignSvgImportRequest {
    readonly id: string;
    readonly expectedRevision: string;
    readonly commandId: string;
    readonly pageId: string;
    readonly parentId: string | null;
    readonly index: number | null;
    readonly x: number;
    readonly y: number;
    readonly name: string;
    readonly source: string;
}
/** Intentional SVG file transfer and parsing remain bounded independently of canvas scrolling. */
export declare class DesignSvgImportLimits {
    static readonly bytes: bigint;
    static readonly characters: number;
}
