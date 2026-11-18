// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { AgileChanged } from '../src/agile/interface/AgileView.js';
import type {
    WorkspacePreferenceGetParams,
    WorkspacePreferenceSetParams,
    WorkspacePreferenceView,
} from '../src/dataplane/WorkspacePreferenceTypes.js';
import type {
    GatewayMethods,
    ConnectChallengeData,
    ChangedData,
} from '../src/gateway/ProtocolTypes.js';
import type { SessionHistoryRecord, SessionHistoryData } from '../src/gateway/HistoryTypes.js';
import type {
    TurnEventData,
    ToolSitesData,
    TurnEndData,
    SessionMessageData,
    ApprovalRequestedData,
    ApprovalResolvedData,
    WireError,
} from '../src/gateway/ProtocolEventTypes.js';
import type { NcapDelta } from '../src/ncap/DeltaTypes.js';
import type { VoiceCallEvent } from '../src/voice/VoiceCallTypes.js';
import type { ReverseCatalogPage, ReverseEvidencePage } from '../src/reverse/ArchiveTypes.js';
import type { ReverseBrowserPage } from '../src/reverse/BrowserCaptureTypes.js';
import type { BrowserModulePage } from '../src/reverse/BrowserModuleDirectoryTypes.js';
import type { BrowserScreenshotPage } from '../src/reverse/BrowserScreenshotTypes.js';
import type { BrowserSourcesPage } from '../src/reverse/BrowserSourcesDirectoryTypes.js';
import type { BrowserStorageComparisonPage } from '../src/reverse/BrowserStorageComparisonTypes.js';
import type { BrowserStoragePage } from '../src/reverse/BrowserStorageTypes.js';
import type { BrowserStructurePage } from '../src/reverse/BrowserStructureTypes.js';
import type { BrowserWebMcpPage } from '../src/reverse/BrowserWebMcpDirectoryTypes.js';
import type { ReverseGraphPage } from '../src/reverse/GraphTypes.js';
import type { ReverseFunctionsPage, ReverseInspectResult } from '../src/reverse/NavigationTypes.js';
import type { ReverseNetworkDetailPage } from '../src/reverse/NetworkDetailTypes.js';
import type { ReverseNetworkDirectoryPage } from '../src/reverse/NetworkDirectoryTypes.js';
import type { ReverseRunSnapshot } from '../src/reverse/ProgressTypes.js';

/**
 * Every wire contract the generated schema validates: the gateway methods, the events and the
 * paged reverse-engineering responses. Each field becomes one named validator.
 */
export interface Contract {
    readonly sessionPlanning: AgileChanged;
    readonly workspacePreferenceGet: WorkspacePreferenceGetParams;
    readonly workspacePreferenceSet: WorkspacePreferenceSetParams;
    readonly workspacePreferenceView: WorkspacePreferenceView;
    readonly reverseBrowser: ReverseBrowserPage;
    readonly reverseBrowserStructure: BrowserStructurePage;
    readonly reverseBrowserScreenshot: BrowserScreenshotPage;
    readonly reverseBrowserStorage: BrowserStoragePage;
    readonly reverseBrowserStorageComparison: BrowserStorageComparisonPage;
    readonly reverseBrowserWebMcp: BrowserWebMcpPage;
    readonly reverseBrowserSources: BrowserSourcesPage;
    readonly reverseBrowserModules: BrowserModulePage;
    readonly reverseNetworkDetail: ReverseNetworkDetailPage;
    readonly reverseNetworkDirectory: ReverseNetworkDirectoryPage;
    readonly reverseGraph: ReverseGraphPage;
    readonly reverseSnapshot: ReverseRunSnapshot;
    readonly reverseCatalog: ReverseCatalogPage;
    readonly reverseEvidence: ReverseEvidencePage;
    readonly reverseFunctions: ReverseFunctionsPage;
    readonly reverseInspection: ReverseInspectResult;
    readonly historyRecord: SessionHistoryRecord;
    readonly sessionHistory: SessionHistoryData;
    readonly methods: GatewayMethods;
    readonly challenge: ConnectChallengeData;
    readonly turnEvent: TurnEventData;
    readonly toolSites: ToolSitesData;
    readonly turnEnd: TurnEndData;
    readonly sessionMessage: SessionMessageData;
    readonly approvalRequested: ApprovalRequestedData;
    readonly approvalResolved: ApprovalResolvedData;
    readonly changed: ChangedData;
    readonly error: WireError;
    /** Internal prompt and token receipts never belong in public payloads. */
    readonly native: Omit<NcapDelta, 'quickDecision'>;
    readonly voice: VoiceCallEvent;
}
