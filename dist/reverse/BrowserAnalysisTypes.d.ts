import type { BrowserSourcesSnapshot } from './BrowserSourcesDirectoryTypes.js';
/** Body-free identity of an exact map member in the immutable analysis snapshot. */
export interface BrowserAnalysisMapInput {
    readonly selector: string;
    readonly baseUrl: string;
    readonly sha256: string;
    readonly bytes: string;
}
/** Body-free provenance links a derived shared analysis to the exact original browser capture. */
export interface BrowserAnalysisInput extends BrowserSourcesSnapshot {
    readonly sourceRunSha256: string;
    readonly manifestSha256: string;
    readonly manifestBytes: string;
    readonly exportedFiles: string;
    readonly importMap?: BrowserAnalysisMapInput;
}
