import type { ReverseApplicationSnapshot } from './ApplicationTypes.js';
import type { ReverseArchiveRef } from './ArchiveIdentity.js';
import type { BrowserAnalysisInput } from './BrowserAnalysisTypes.js';
import type { ReverseBrowserSnapshot } from './BrowserCaptureTypes.js';
import type { BrowserScreenshotComparisonSnapshot } from './BrowserScreenshotComparisonTypes.js';
import type { BrowserScreenshotSnapshot } from './BrowserScreenshotTypes.js';
import type { BrowserSourcesSnapshot } from './BrowserSourcesDirectoryTypes.js';
import type { BrowserStorageComparisonSnapshot } from './BrowserStorageComparisonTypes.js';
import type { BrowserStorageSnapshot } from './BrowserStorageTypes.js';
import type { BrowserStructureSnapshot } from './BrowserStructureTypes.js';
import type { BrowserWebMcpSnapshot } from './BrowserWebMcpTypes.js';
import type { ReverseNetworkSnapshot } from './NetworkTypes.js';
import type { ReverseState, ReverseTarget } from './ReversePrimitivesTypes.js';
import type { ReverseWorkspaceState } from './WorkspaceTypes.js';
/** A runtime-owned step in the shared investigation plan. Reports remain unverified findings. */
export interface ReverseTaskSnapshot {
    readonly expert: string;
    readonly dependsOn: readonly string[];
    readonly state: ReverseState;
    readonly attempts: number;
    readonly startedAtMs: string | null;
    readonly finishedAtMs: string | null;
    readonly report: string | null;
    readonly error: string | null;
}
/** An evidence-linked follow-up requested by a specialist and executed by the runtime. */
export interface ReversePlanStep extends ReverseTaskSnapshot {
    readonly id: string;
    readonly objective: string;
    readonly scope: string;
    readonly requestedBy: string;
    readonly evidenceIds: readonly string[];
}
/** Provenance for one immutable evidence file, shared by specialists in the same run. */
export interface ReverseEvidenceRecord {
    readonly id: string;
    readonly expert: string;
    readonly operation: string;
    readonly selector: string | null;
    readonly path: string;
    readonly excerpt: string;
    readonly characters: string;
    readonly createdAtMs: string;
    readonly stepId?: string;
}
/** Bounded, capability-free projection carried by live tool events and the final receipt. */
export interface ReverseRunSnapshot {
    readonly version: 1;
    /** Persisted agent presentation is independent from execution progress. */
    readonly workspace?: ReverseWorkspaceState;
    readonly archive?: ReverseArchiveRef;
    readonly id: string;
    readonly revision: string;
    /** Explicit resumed execution epoch; absent means the original execution. */
    readonly execution?: number;
    readonly inputName: string;
    readonly sha256: string;
    readonly question: string;
    readonly kind?: ReverseTarget;
    readonly application?: ReverseApplicationSnapshot;
    readonly network?: ReverseNetworkSnapshot;
    readonly browser?: ReverseBrowserSnapshot;
    readonly browserStructure?: BrowserStructureSnapshot;
    readonly browserSources?: BrowserSourcesSnapshot;
    readonly browserScreenshot?: BrowserScreenshotSnapshot;
    readonly browserStorage?: BrowserStorageSnapshot;
    readonly browserStorageComparison?: BrowserStorageComparisonSnapshot;
    readonly browserWebMcp?: BrowserWebMcpSnapshot;
    readonly browserComparison?: BrowserScreenshotComparisonSnapshot;
    readonly browserInput?: BrowserAnalysisInput;
    readonly state: ReverseState;
    readonly tasks: readonly ReverseTaskSnapshot[];
    readonly plan?: readonly ReversePlanStep[];
    readonly evidenceCount: number;
    readonly evidence: readonly ReverseEvidenceRecord[];
    readonly cleanupErrors: readonly string[];
}
