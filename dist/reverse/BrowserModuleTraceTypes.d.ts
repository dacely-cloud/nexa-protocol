/** Importer selection provenance never claims an observed installed runtime base. */
export declare const BrowserModuleContext: {
    readonly Explicit: 'explicit-importer-url';
    readonly Reported: 'reported-source-url';
};
/** Selected source URL context provenance. */
export type BrowserModuleContext = (typeof BrowserModuleContext)[keyof typeof BrowserModuleContext];
/** Native URL evidence is distinct from computed syntax and runtime execution. */
export declare const BrowserModuleTraceStatus: {
    readonly Native: 'native-resolution';
    readonly Computed: 'computed-specifier';
    readonly Unsupported: 'unsupported-literal';
};
/** Resolution state for one outgoing ES module relationship. */
export type BrowserModuleTraceStatus = (typeof BrowserModuleTraceStatus)[keyof typeof BrowserModuleTraceStatus];
