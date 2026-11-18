/** Captured URL match strength is independent of execution and content identity. */
export declare const BrowserModuleMatch: {
    readonly Exact: 'exact-reported-url';
    readonly Response: 'response-url-without-fragment';
};
/** Browser URL candidate matching provenance. */
export type BrowserModuleMatch = (typeof BrowserModuleMatch)[keyof typeof BrowserModuleMatch];
