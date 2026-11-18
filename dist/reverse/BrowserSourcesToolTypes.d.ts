import type { BrowserSourceScript } from './BrowserSourcesTypes.js';
/** Metadata and source content are selected independently, with distinct cursors. */
export declare const BrowserSourcesView: {
    readonly Scripts: 'scripts';
    readonly Resources: 'resources';
    readonly Source: 'source';
};
/** Saved capture views do not attach or execute page code. */
export type BrowserSourcesView = (typeof BrowserSourcesView)[keyof typeof BrowserSourcesView];
/** Script listings never inline their source bodies. */
export interface BrowserSourceScriptSummary extends Omit<BrowserSourceScript, 'source'> {
    readonly source: Omit<BrowserSourceScript['source'], 'text'>;
}
