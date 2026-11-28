import type { AgileChanged } from '../agile/interface/AgileView.js';
import type { ConnectorExecutionStatus } from '../dataplane/ConnectorExecutionTypes.js';
import type { WorkspacePreferenceGetParams, WorkspacePreferenceSetParams, WorkspacePreferenceView } from '../dataplane/WorkspacePreferenceTypes.js';
import type { AttachedEnvironmentRequestData } from '../environments/AttachedEnvironmentTypes.js';
import type { SessionHistoryData, SessionHistoryRecord } from '../gateway/HistoryTypes.js';
import type { ApprovalRequestedData, ApprovalResolvedData, SessionMessageData, ToolSitesData, TurnEndData, TurnEventData, WireError } from '../gateway/ProtocolEventTypes.js';
import type { ChangedData, ConnectChallengeData, GatewayMethods } from '../gateway/ProtocolTypes.js';
import type { NcapDelta } from '../ncap/DeltaTypes.js';
import type { ReverseCatalogPage, ReverseEvidencePage } from '../reverse/ArchiveTypes.js';
import type { ReverseBrowserPage } from '../reverse/BrowserCaptureTypes.js';
import type { BrowserModulePage } from '../reverse/BrowserModuleDirectoryTypes.js';
import type { BrowserScreenshotPage } from '../reverse/BrowserScreenshotTypes.js';
import type { BrowserSourcesPage } from '../reverse/BrowserSourcesDirectoryTypes.js';
import type { BrowserStorageComparisonPage } from '../reverse/BrowserStorageComparisonTypes.js';
import type { BrowserStoragePage } from '../reverse/BrowserStorageTypes.js';
import type { BrowserStructurePage } from '../reverse/BrowserStructureTypes.js';
import type { BrowserWebMcpPage } from '../reverse/BrowserWebMcpDirectoryTypes.js';
import type { ReverseGraphPage } from '../reverse/GraphTypes.js';
import type { ReverseFunctionsPage, ReverseInspectResult } from '../reverse/NavigationTypes.js';
import type { ReverseNetworkDetailPage } from '../reverse/NetworkDetailTypes.js';
import type { ReverseNetworkDirectoryPage } from '../reverse/NetworkDirectoryTypes.js';
import type { ReverseRunSnapshot } from '../reverse/ProgressTypes.js';
import type { VoiceCallEvent } from '../voice/VoiceCallTypes.js';
/** Validates untrusted JSON at a protocol boundary. */
export type Validator = (value: unknown) => boolean;
/** Validates a approvalRequested payload and narrows it to its declared type. */
export declare function approvalRequested(value: unknown): value is ApprovalRequestedData;
/** Validates a approvalResolved payload and narrows it to its declared type. */
export declare function approvalResolved(value: unknown): value is ApprovalResolvedData;
/** Validates a challenge payload and narrows it to its declared type. */
export declare function challenge(value: unknown): value is ConnectChallengeData;
/** Validates a changed payload and narrows it to its declared type. */
export declare function changed(value: unknown): value is ChangedData;
/** Validates a environmentRequest payload and narrows it to its declared type. */
export declare function environmentRequest(value: unknown): value is AttachedEnvironmentRequestData;
/** Validates a error payload and narrows it to its declared type. */
export declare function error(value: unknown): value is WireError;
/** Validates a historyRecord payload and narrows it to its declared type. */
export declare function historyRecord(value: unknown): value is SessionHistoryRecord;
/** Validates a methods payload and narrows it to its declared type. */
export declare function methods(value: unknown): value is GatewayMethods;
/** Validates a native payload and narrows it to its declared type. */
export declare function native(value: unknown): value is Omit<NcapDelta, 'quickDecision'>;
/** Validates a reverseBrowser payload and narrows it to its declared type. */
export declare function reverseBrowser(value: unknown): value is ReverseBrowserPage;
/** Validates a reverseBrowserModules payload and narrows it to its declared type. */
export declare function reverseBrowserModules(value: unknown): value is BrowserModulePage;
/** Validates a reverseBrowserScreenshot payload and narrows it to its declared type. */
export declare function reverseBrowserScreenshot(value: unknown): value is BrowserScreenshotPage;
/** Validates a reverseBrowserSources payload and narrows it to its declared type. */
export declare function reverseBrowserSources(value: unknown): value is BrowserSourcesPage;
/** Validates a reverseBrowserStorage payload and narrows it to its declared type. */
export declare function reverseBrowserStorage(value: unknown): value is BrowserStoragePage;
/** Validates a reverseBrowserStorageComparison payload and narrows it to its declared type. */
export declare function reverseBrowserStorageComparison(value: unknown): value is BrowserStorageComparisonPage;
/** Validates a reverseBrowserStructure payload and narrows it to its declared type. */
export declare function reverseBrowserStructure(value: unknown): value is BrowserStructurePage;
/** Validates a reverseBrowserWebMcp payload and narrows it to its declared type. */
export declare function reverseBrowserWebMcp(value: unknown): value is BrowserWebMcpPage;
/** Validates a reverseCatalog payload and narrows it to its declared type. */
export declare function reverseCatalog(value: unknown): value is ReverseCatalogPage;
/** Validates a reverseEvidence payload and narrows it to its declared type. */
export declare function reverseEvidence(value: unknown): value is ReverseEvidencePage;
/** Validates a reverseFunctions payload and narrows it to its declared type. */
export declare function reverseFunctions(value: unknown): value is ReverseFunctionsPage;
/** Validates a reverseGraph payload and narrows it to its declared type. */
export declare function reverseGraph(value: unknown): value is ReverseGraphPage;
/** Validates a reverseInspection payload and narrows it to its declared type. */
export declare function reverseInspection(value: unknown): value is ReverseInspectResult;
/** Validates a reverseNetworkDetail payload and narrows it to its declared type. */
export declare function reverseNetworkDetail(value: unknown): value is ReverseNetworkDetailPage;
/** Validates a reverseNetworkDirectory payload and narrows it to its declared type. */
export declare function reverseNetworkDirectory(value: unknown): value is ReverseNetworkDirectoryPage;
/** Validates a reverseSnapshot payload and narrows it to its declared type. */
export declare function reverseSnapshot(value: unknown): value is ReverseRunSnapshot;
/** Validates a sessionHistory payload and narrows it to its declared type. */
export declare function sessionHistory(value: unknown): value is SessionHistoryData;
/** Validates a sessionMessage payload and narrows it to its declared type. */
export declare function sessionMessage(value: unknown): value is SessionMessageData;
/** Validates a sessionPlanning payload and narrows it to its declared type. */
export declare function sessionPlanning(value: unknown): value is AgileChanged;
/** Validates a toolSites payload and narrows it to its declared type. */
export declare function toolSites(value: unknown): value is ToolSitesData;
/** Validates a turnEnd payload and narrows it to its declared type. */
export declare function turnEnd(value: unknown): value is TurnEndData;
/** Validates a turnEvent payload and narrows it to its declared type. */
export declare function turnEvent(value: unknown): value is TurnEventData;
/** Validates a voice payload and narrows it to its declared type. */
export declare function voice(value: unknown): value is VoiceCallEvent;
/** Validates a workspacePreferenceGet payload and narrows it to its declared type. */
export declare function workspacePreferenceGet(value: unknown): value is WorkspacePreferenceGetParams;
/** Validates a workspacePreferenceSet payload and narrows it to its declared type. */
export declare function workspacePreferenceSet(value: unknown): value is WorkspacePreferenceSetParams;
/** Validates a workspacePreferenceView payload and narrows it to its declared type. */
export declare function workspacePreferenceView(value: unknown): value is WorkspacePreferenceView;
/** Validates the params of `accounts.create`. */
export declare function accountsCreateParams(value: unknown): boolean;
/** Validates the result of `accounts.create`. */
export declare function accountsCreateResult(value: unknown): boolean;
/** Validates the params of `accounts.list`. */
export declare function accountsListParams(value: unknown): boolean;
/** Validates the result of `accounts.list`. */
export declare function accountsListResult(value: unknown): boolean;
/** Validates the params of `accounts.remove`. */
export declare function accountsRemoveParams(value: unknown): boolean;
/** Validates the result of `accounts.remove`. */
export declare function accountsRemoveResult(value: unknown): boolean;
/** Validates the params of `accounts.usage`. */
export declare function accountsUsageParams(value: unknown): boolean;
/** Validates the result of `accounts.usage`. */
export declare function accountsUsageResult(value: unknown): boolean;
/** Validates the params of `agent.ask`. */
export declare function agentAskParams(value: unknown): boolean;
/** Validates the result of `agent.ask`. */
export declare function agentAskResult(value: unknown): boolean;
/** Validates the params of `agent.profiles.create`. */
export declare function agentProfilesCreateParams(value: unknown): boolean;
/** Validates the result of `agent.profiles.create`. */
export declare function agentProfilesCreateResult(value: unknown): boolean;
/** Validates the params of `agent.profiles.delete`. */
export declare function agentProfilesDeleteParams(value: unknown): boolean;
/** Validates the result of `agent.profiles.delete`. */
export declare function agentProfilesDeleteResult(value: unknown): boolean;
/** Validates the params of `agent.profiles.list`. */
export declare function agentProfilesListParams(value: unknown): boolean;
/** Validates the result of `agent.profiles.list`. */
export declare function agentProfilesListResult(value: unknown): boolean;
/** Validates the params of `agent.profiles.update`. */
export declare function agentProfilesUpdateParams(value: unknown): boolean;
/** Validates the result of `agent.profiles.update`. */
export declare function agentProfilesUpdateResult(value: unknown): boolean;
/** Validates the params of `agent.profiles.upgrade`. */
export declare function agentProfilesUpgradeParams(value: unknown): boolean;
/** Validates the result of `agent.profiles.upgrade`. */
export declare function agentProfilesUpgradeResult(value: unknown): boolean;
/** Validates the params of `agent.steer`. */
export declare function agentSteerParams(value: unknown): boolean;
/** Validates the result of `agent.steer`. */
export declare function agentSteerResult(value: unknown): boolean;
/** Validates the params of `agent.stream`. */
export declare function agentStreamParams(value: unknown): boolean;
/** Validates the result of `agent.stream`. */
export declare function agentStreamResult(value: unknown): boolean;
/** Validates the params of `agents.define`. */
export declare function agentsDefineParams(value: unknown): boolean;
/** Validates the result of `agents.define`. */
export declare function agentsDefineResult(value: unknown): boolean;
/** Validates the params of `agents.list`. */
export declare function agentsListParams(value: unknown): boolean;
/** Validates the result of `agents.list`. */
export declare function agentsListResult(value: unknown): boolean;
/** Validates the params of `approvals.list`. */
export declare function approvalsListParams(value: unknown): boolean;
/** Validates the result of `approvals.list`. */
export declare function approvalsListResult(value: unknown): boolean;
/** Validates the params of `approvals.resolve`. */
export declare function approvalsResolveParams(value: unknown): boolean;
/** Validates the result of `approvals.resolve`. */
export declare function approvalsResolveResult(value: unknown): boolean;
/** Validates the params of `channels.deadLetters.list`. */
export declare function channelsDeadLettersListParams(value: unknown): boolean;
/** Validates the result of `channels.deadLetters.list`. */
export declare function channelsDeadLettersListResult(value: unknown): boolean;
/** Validates the params of `channels.list`. */
export declare function channelsListParams(value: unknown): boolean;
/** Validates the result of `channels.list`. */
export declare function channelsListResult(value: unknown): boolean;
/** Validates the params of `channels.status`. */
export declare function channelsStatusParams(value: unknown): boolean;
/** Validates the result of `channels.status`. */
export declare function channelsStatusResult(value: unknown): boolean;
/** Validates the params of `config.get`. */
export declare function configGetParams(value: unknown): boolean;
/** Validates the result of `config.get`. */
export declare function configGetResult(value: unknown): boolean;
/** Validates the params of `config.set`. */
export declare function configSetParams(value: unknown): boolean;
/** Validates the result of `config.set`. */
export declare function configSetResult(value: unknown): boolean;
/** Validates the params of `config.unset`. */
export declare function configUnsetParams(value: unknown): boolean;
/** Validates the result of `config.unset`. */
export declare function configUnsetResult(value: unknown): boolean;
/** Validates the params of `connect`. */
export declare function connectParams(value: unknown): boolean;
/** Validates the result of `connect`. */
export declare function connectResult(value: unknown): boolean;
/** Validates the params of `connections.applications.check`. */
export declare function connectionsApplicationsCheckParams(value: unknown): boolean;
/** Validates the result of `connections.applications.check`. */
export declare function connectionsApplicationsCheckResult(value: unknown): boolean;
/** Validates the params of `connections.applications.setup`. */
export declare function connectionsApplicationsSetupParams(value: unknown): boolean;
/** Validates the result of `connections.applications.setup`. */
export declare function connectionsApplicationsSetupResult(value: unknown): boolean;
/** Validates the params of `connections.models.list`. */
export declare function connectionsModelsListParams(value: unknown): boolean;
/** Validates the result of `connections.models.list`. */
export declare function connectionsModelsListResult(value: unknown): boolean;
/** Validates the params of `connections.tools.install`. */
export declare function connectionsToolsInstallParams(value: unknown): boolean;
/** Validates the result of `connections.tools.install`. */
export declare function connectionsToolsInstallResult(value: unknown): boolean;
/** Validates the params of `connections.tools.remove`. */
export declare function connectionsToolsRemoveParams(value: unknown): boolean;
/** Validates the result of `connections.tools.remove`. */
export declare function connectionsToolsRemoveResult(value: unknown): boolean;
/** Validates the params of `connections.tools.status`. */
export declare function connectionsToolsStatusParams(value: unknown): boolean;
/** Validates the result of `connections.tools.status`. */
export declare function connectionsToolsStatusResult(value: unknown): boolean;
/** Validates the params of `connectors.context.check`. */
export declare function connectorsContextCheckParams(value: unknown): boolean;
/** Validates the result of `connectors.context.check`, then its dependent counters, grants and bounded text. */
export declare function connectorsContextCheckResult(value: unknown): boolean;
/** Validates the params of `connectors.execution`. */
export declare function connectorsExecutionParams(value: unknown): boolean;
/** Validates complete bounded connector permission metadata. */
export declare function connectorsExecutionResult(value: unknown): value is ConnectorExecutionStatus;
/** Validates the params of `connectors.execution.cancel`. */
export declare function connectorsExecutionCancelParams(value: unknown): boolean;
/** Validates the result of `connectors.execution.cancel`. */
export declare function connectorsExecutionCancelResult(value: unknown): boolean;
/** Validates the params of `connectors.execution.get`. */
export declare function connectorsExecutionGetParams(value: unknown): boolean;
/** Validates the result of `connectors.execution.get`. */
export declare function connectorsExecutionGetResult(value: unknown): boolean;
/** Validates the params of `connectors.execution.jobs`. */
export declare function connectorsExecutionJobsParams(value: unknown): boolean;
/** Validates the result of `connectors.execution.jobs`. */
export declare function connectorsExecutionJobsResult(value: unknown): boolean;
/** Validates the params of `connectors.execution.output`. */
export declare function connectorsExecutionOutputParams(value: unknown): boolean;
/** Validates the result of `connectors.execution.output`. */
export declare function connectorsExecutionOutputResult(value: unknown): boolean;
/** Validates the params of `connectors.execution.submit`. */
export declare function connectorsExecutionSubmitParams(value: unknown): boolean;
/** Validates the result of `connectors.execution.submit`. */
export declare function connectorsExecutionSubmitResult(value: unknown): boolean;
/** Validates the params of `connectors.files.get`. */
export declare function connectorsFilesGetParams(value: unknown): boolean;
/** Validates the result of `connectors.files.get`. */
export declare function connectorsFilesGetResult(value: unknown): boolean;
/** Validates the params of `connectors.files.submit`. */
export declare function connectorsFilesSubmitParams(value: unknown): boolean;
/** Validates the result of `connectors.files.submit`. */
export declare function connectorsFilesSubmitResult(value: unknown): boolean;
/** Validates the params of `connectors.filesystem`. */
export declare function connectorsFilesystemParams(value: unknown): boolean;
/** Validates the result of `connectors.filesystem`. */
export declare function connectorsFilesystemResult(value: unknown): boolean;
/** Validates the params of `connectors.get`. */
export declare function connectorsGetParams(value: unknown): boolean;
/** Validates the result of `connectors.get`. */
export declare function connectorsGetResult(value: unknown): boolean;
/** Validates the params of `connectors.host.result`. */
export declare function connectorsHostResultParams(value: unknown): boolean;
/** Validates the result of `connectors.host.result`, then its dependent counters, grants and bounded text. */
export declare function connectorsHostResultResult(value: unknown): boolean;
/** Validates the params of `connectors.host.status`. */
export declare function connectorsHostStatusParams(value: unknown): boolean;
/** Validates the result of `connectors.host.status`, then its dependent counters, grants and bounded text. */
export declare function connectorsHostStatusResult(value: unknown): boolean;
/** Validates the params of `connectors.host.submit`, then its dependent counters, grants and bounded text. */
export declare function connectorsHostSubmitParams(value: unknown): boolean;
/** Validates the result of `connectors.host.submit`, then its dependent counters, grants and bounded text. */
export declare function connectorsHostSubmitResult(value: unknown): boolean;
/** Validates the params of `connectors.instructions.get`. */
export declare function connectorsInstructionsGetParams(value: unknown): boolean;
/** Validates the result of `connectors.instructions.get`, then its dependent counters, grants and bounded text. */
export declare function connectorsInstructionsGetResult(value: unknown): boolean;
/** Validates the params of `connectors.instructions.update`, then its dependent counters, grants and bounded text. */
export declare function connectorsInstructionsUpdateParams(value: unknown): boolean;
/** Validates the result of `connectors.instructions.update`, then its dependent counters, grants and bounded text. */
export declare function connectorsInstructionsUpdateResult(value: unknown): boolean;
/** Validates the params of `connectors.inventory`. */
export declare function connectorsInventoryParams(value: unknown): boolean;
/** Validates the result of `connectors.inventory`, then its dependent counters, grants and bounded text. */
export declare function connectorsInventoryResult(value: unknown): boolean;
/** Validates the params of `connectors.link.approve`. */
export declare function connectorsLinkApproveParams(value: unknown): boolean;
/** Validates the result of `connectors.link.approve`. */
export declare function connectorsLinkApproveResult(value: unknown): boolean;
/** Validates the params of `connectors.link.deny`. */
export declare function connectorsLinkDenyParams(value: unknown): boolean;
/** Validates the result of `connectors.link.deny`. */
export declare function connectorsLinkDenyResult(value: unknown): boolean;
/** Validates the params of `connectors.link.review`. */
export declare function connectorsLinkReviewParams(value: unknown): boolean;
/** Validates the result of `connectors.link.review`. */
export declare function connectorsLinkReviewResult(value: unknown): boolean;
/** Validates the params of `connectors.list`. */
export declare function connectorsListParams(value: unknown): boolean;
/** Validates the result of `connectors.list`. */
export declare function connectorsListResult(value: unknown): boolean;
/** Validates the params of `connectors.revoke`. */
export declare function connectorsRevokeParams(value: unknown): boolean;
/** Validates the result of `connectors.revoke`. */
export declare function connectorsRevokeResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.catalog`. */
export declare function connectorsWorkspaceCatalogParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.catalog`. */
export declare function connectorsWorkspaceCatalogResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.clear`. */
export declare function connectorsWorkspaceClearParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.clear`. */
export declare function connectorsWorkspaceClearResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.create`. */
export declare function connectorsWorkspaceCreateParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.create`. */
export declare function connectorsWorkspaceCreateResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.get`. */
export declare function connectorsWorkspaceGetParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.get`, then its dependent counters, grants and bounded text. */
export declare function connectorsWorkspaceGetResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.preference.get`. */
export declare function connectorsWorkspacePreferenceGetParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.preference.get`. */
export declare function connectorsWorkspacePreferenceGetResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.preference.set`. */
export declare function connectorsWorkspacePreferenceSetParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.preference.set`. */
export declare function connectorsWorkspacePreferenceSetResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.select`. */
export declare function connectorsWorkspaceSelectParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.select`. */
export declare function connectorsWorkspaceSelectResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.select-host`, then its dependent counters, grants and bounded text. */
export declare function connectorsWorkspaceSelectHostParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.select-host`. */
export declare function connectorsWorkspaceSelectHostResult(value: unknown): boolean;
/** Validates the params of `connectors.workspace.select-joint`. */
export declare function connectorsWorkspaceSelectJointParams(value: unknown): boolean;
/** Validates the result of `connectors.workspace.select-joint`. */
export declare function connectorsWorkspaceSelectJointResult(value: unknown): boolean;
/** Validates the params of `credit.budgets`. */
export declare function creditBudgetsParams(value: unknown): boolean;
/** Validates the result of `credit.budgets`. */
export declare function creditBudgetsResult(value: unknown): boolean;
/** Validates the params of `credit.removeBudget`. */
export declare function creditRemoveBudgetParams(value: unknown): boolean;
/** Validates the result of `credit.removeBudget`. */
export declare function creditRemoveBudgetResult(value: unknown): boolean;
/** Validates the params of `credit.resetAllowance`. */
export declare function creditResetAllowanceParams(value: unknown): boolean;
/** Validates the result of `credit.resetAllowance`. */
export declare function creditResetAllowanceResult(value: unknown): boolean;
/** Validates the params of `credit.resetHistory`. */
export declare function creditResetHistoryParams(value: unknown): boolean;
/** Validates the result of `credit.resetHistory`. */
export declare function creditResetHistoryResult(value: unknown): boolean;
/** Validates the params of `credit.resets`. */
export declare function creditResetsParams(value: unknown): boolean;
/** Validates the result of `credit.resets`. */
export declare function creditResetsResult(value: unknown): boolean;
/** Validates the params of `credit.setBudget`. */
export declare function creditSetBudgetParams(value: unknown): boolean;
/** Validates the result of `credit.setBudget`. */
export declare function creditSetBudgetResult(value: unknown): boolean;
/** Validates the params of `credit.spend`. */
export declare function creditSpendParams(value: unknown): boolean;
/** Validates the result of `credit.spend`. */
export declare function creditSpendResult(value: unknown): boolean;
/** Validates the params of `credit.summary`. */
export declare function creditSummaryParams(value: unknown): boolean;
/** Validates the result of `credit.summary`. */
export declare function creditSummaryResult(value: unknown): boolean;
/** Validates the params of `credit.wallet`. */
export declare function creditWalletParams(value: unknown): boolean;
/** Validates the result of `credit.wallet`. */
export declare function creditWalletResult(value: unknown): boolean;
/** Validates the params of `credit.walletHistory`. */
export declare function creditWalletHistoryParams(value: unknown): boolean;
/** Validates the result of `credit.walletHistory`. */
export declare function creditWalletHistoryResult(value: unknown): boolean;
/** Validates the params of `data.upload.cancel`. */
export declare function dataUploadCancelParams(value: unknown): boolean;
/** Validates the result of `data.upload.cancel`. */
export declare function dataUploadCancelResult(value: unknown): boolean;
/** Validates the params of `data.upload.chunk`. */
export declare function dataUploadChunkParams(value: unknown): boolean;
/** Validates the result of `data.upload.chunk`. */
export declare function dataUploadChunkResult(value: unknown): boolean;
/** Validates the params of `data.upload.create`. */
export declare function dataUploadCreateParams(value: unknown): boolean;
/** Validates the result of `data.upload.create`. */
export declare function dataUploadCreateResult(value: unknown): boolean;
/** Validates the params of `data.upload.finish`. */
export declare function dataUploadFinishParams(value: unknown): boolean;
/** Validates the result of `data.upload.finish`. */
export declare function dataUploadFinishResult(value: unknown): boolean;
/** Validates the params of `data.upload.select`. */
export declare function dataUploadSelectParams(value: unknown): boolean;
/** Validates the result of `data.upload.select`. */
export declare function dataUploadSelectResult(value: unknown): boolean;
/** Validates the params of `data.upload.start`. */
export declare function dataUploadStartParams(value: unknown): boolean;
/** Validates the result of `data.upload.start`. */
export declare function dataUploadStartResult(value: unknown): boolean;
/** Validates the params of `data.upload.target`. */
export declare function dataUploadTargetParams(value: unknown): boolean;
/** Validates the result of `data.upload.target`. */
export declare function dataUploadTargetResult(value: unknown): boolean;
/** Validates the params of `decision.run`. */
export declare function decisionRunParams(value: unknown): boolean;
/** Validates the result of `decision.run`. */
export declare function decisionRunResult(value: unknown): boolean;
/** Validates the params of `design.arrange`. */
export declare function designArrangeParams(value: unknown): boolean;
/** Validates the result of `design.arrange`. */
export declare function designArrangeResult(value: unknown): boolean;
/** Validates the params of `design.asset.cancel`. */
export declare function designAssetCancelParams(value: unknown): boolean;
/** Validates the result of `design.asset.cancel`. */
export declare function designAssetCancelResult(value: unknown): boolean;
/** Validates the params of `design.asset.chunk`. */
export declare function designAssetChunkParams(value: unknown): boolean;
/** Validates the result of `design.asset.chunk`. */
export declare function designAssetChunkResult(value: unknown): boolean;
/** Validates the params of `design.asset.finish`. */
export declare function designAssetFinishParams(value: unknown): boolean;
/** Validates the result of `design.asset.finish`. */
export declare function designAssetFinishResult(value: unknown): boolean;
/** Validates the params of `design.asset.list`. */
export declare function designAssetListParams(value: unknown): boolean;
/** Validates the result of `design.asset.list`. */
export declare function designAssetListResult(value: unknown): boolean;
/** Validates the params of `design.asset.read`. */
export declare function designAssetReadParams(value: unknown): boolean;
/** Validates the result of `design.asset.read`. */
export declare function designAssetReadResult(value: unknown): boolean;
/** Validates the params of `design.asset.remove`. */
export declare function designAssetRemoveParams(value: unknown): boolean;
/** Validates the result of `design.asset.remove`. */
export declare function designAssetRemoveResult(value: unknown): boolean;
/** Validates the params of `design.asset.start`. */
export declare function designAssetStartParams(value: unknown): boolean;
/** Validates the result of `design.asset.start`. */
export declare function designAssetStartResult(value: unknown): boolean;
/** Validates the params of `design.asset.thumbnail`. */
export declare function designAssetThumbnailParams(value: unknown): boolean;
/** Validates the result of `design.asset.thumbnail`. */
export declare function designAssetThumbnailResult(value: unknown): boolean;
/** Validates the params of `design.canvas`. */
export declare function designCanvasParams(value: unknown): boolean;
/** Validates the result of `design.canvas`. */
export declare function designCanvasResult(value: unknown): boolean;
/** Validates the params of `design.canvas.metrics`. */
export declare function designCanvasMetricsParams(value: unknown): boolean;
/** Validates the result of `design.canvas.metrics`. */
export declare function designCanvasMetricsResult(value: unknown): boolean;
/** Validates the params of `design.changes`. */
export declare function designChangesParams(value: unknown): boolean;
/** Validates the result of `design.changes`. */
export declare function designChangesResult(value: unknown): boolean;
/** Validates the params of `design.clipboard.copy`. */
export declare function designClipboardCopyParams(value: unknown): boolean;
/** Validates the result of `design.clipboard.copy`. */
export declare function designClipboardCopyResult(value: unknown): boolean;
/** Validates the params of `design.clipboard.cut`. */
export declare function designClipboardCutParams(value: unknown): boolean;
/** Validates the result of `design.clipboard.cut`. */
export declare function designClipboardCutResult(value: unknown): boolean;
/** Validates the params of `design.clipboard.paste`. */
export declare function designClipboardPasteParams(value: unknown): boolean;
/** Validates the result of `design.clipboard.paste`. */
export declare function designClipboardPasteResult(value: unknown): boolean;
/** Validates the params of `design.colors`. */
export declare function designColorsParams(value: unknown): boolean;
/** Validates the result of `design.colors`. */
export declare function designColorsResult(value: unknown): boolean;
/** Validates the params of `design.comment.text`. */
export declare function designCommentTextParams(value: unknown): boolean;
/** Validates the result of `design.comment.text`. */
export declare function designCommentTextResult(value: unknown): boolean;
/** Validates the params of `design.comments`. */
export declare function designCommentsParams(value: unknown): boolean;
/** Validates the result of `design.comments`. */
export declare function designCommentsResult(value: unknown): boolean;
/** Validates the params of `design.component`. */
export declare function designComponentParams(value: unknown): boolean;
/** Validates the result of `design.component`. */
export declare function designComponentResult(value: unknown): boolean;
/** Validates the params of `design.create`. */
export declare function designCreateParams(value: unknown): boolean;
/** Validates the result of `design.create`. */
export declare function designCreateResult(value: unknown): boolean;
/** Validates the params of `design.delete`. */
export declare function designDeleteParams(value: unknown): boolean;
/** Validates the result of `design.delete`. */
export declare function designDeleteResult(value: unknown): boolean;
/** Validates the params of `design.duplicate`. */
export declare function designDuplicateParams(value: unknown): boolean;
/** Validates the result of `design.duplicate`. */
export declare function designDuplicateResult(value: unknown): boolean;
/** Validates the params of `design.events`. */
export declare function designEventsParams(value: unknown): boolean;
/** Validates the result of `design.events`. */
export declare function designEventsResult(value: unknown): boolean;
/** Validates the params of `design.font.list`. */
export declare function designFontListParams(value: unknown): boolean;
/** Validates the result of `design.font.list`. */
export declare function designFontListResult(value: unknown): boolean;
/** Validates the params of `design.font.read`. */
export declare function designFontReadParams(value: unknown): boolean;
/** Validates the result of `design.font.read`. */
export declare function designFontReadResult(value: unknown): boolean;
/** Validates the params of `design.import`. */
export declare function designImportParams(value: unknown): boolean;
/** Validates the result of `design.import`. */
export declare function designImportResult(value: unknown): boolean;
/** Validates the params of `design.layout`. */
export declare function designLayoutParams(value: unknown): boolean;
/** Validates the result of `design.layout`. */
export declare function designLayoutResult(value: unknown): boolean;
/** Validates the params of `design.layout.preview`. */
export declare function designLayoutPreviewParams(value: unknown): boolean;
/** Validates the result of `design.layout.preview`. */
export declare function designLayoutPreviewResult(value: unknown): boolean;
/** Validates the params of `design.list`. */
export declare function designListParams(value: unknown): boolean;
/** Validates the result of `design.list`. */
export declare function designListResult(value: unknown): boolean;
/** Validates the params of `design.pattern.tile`. */
export declare function designPatternTileParams(value: unknown): boolean;
/** Validates the result of `design.pattern.tile`. */
export declare function designPatternTileResult(value: unknown): boolean;
/** Validates the params of `design.read`. */
export declare function designReadParams(value: unknown): boolean;
/** Validates the result of `design.read`. */
export declare function designReadResult(value: unknown): boolean;
/** Validates the params of `design.save`. */
export declare function designSaveParams(value: unknown): boolean;
/** Validates the result of `design.save`. */
export declare function designSaveResult(value: unknown): boolean;
/** Validates the params of `design.svg.import`. */
export declare function designSvgImportParams(value: unknown): boolean;
/** Validates the result of `design.svg.import`. */
export declare function designSvgImportResult(value: unknown): boolean;
/** Validates the params of `design.text.window`. */
export declare function designTextWindowParams(value: unknown): boolean;
/** Validates the result of `design.text.window`. */
export declare function designTextWindowResult(value: unknown): boolean;
/** Validates the params of `design.transfer`. */
export declare function designTransferParams(value: unknown): boolean;
/** Validates the result of `design.transfer`. */
export declare function designTransferResult(value: unknown): boolean;
/** Validates the params of `design.undo`. */
export declare function designUndoParams(value: unknown): boolean;
/** Validates the result of `design.undo`. */
export declare function designUndoResult(value: unknown): boolean;
/** Validates the params of `design.view`. */
export declare function designViewParams(value: unknown): boolean;
/** Validates the result of `design.view`. */
export declare function designViewResult(value: unknown): boolean;
/** Validates the params of `devices.approve`. */
export declare function devicesApproveParams(value: unknown): boolean;
/** Validates the result of `devices.approve`. */
export declare function devicesApproveResult(value: unknown): boolean;
/** Validates the params of `devices.list`. */
export declare function devicesListParams(value: unknown): boolean;
/** Validates the result of `devices.list`. */
export declare function devicesListResult(value: unknown): boolean;
/** Validates the params of `devices.reject`. */
export declare function devicesRejectParams(value: unknown): boolean;
/** Validates the result of `devices.reject`. */
export declare function devicesRejectResult(value: unknown): boolean;
/** Validates the params of `devices.revoke`. */
export declare function devicesRevokeParams(value: unknown): boolean;
/** Validates the result of `devices.revoke`. */
export declare function devicesRevokeResult(value: unknown): boolean;
/** Validates the params of `environment.admin.fleet`. */
export declare function environmentAdminFleetParams(value: unknown): boolean;
/** Validates the result of `environment.admin.fleet`. */
export declare function environmentAdminFleetResult(value: unknown): boolean;
/** Validates the params of `environment.admin.inspect`. */
export declare function environmentAdminInspectParams(value: unknown): boolean;
/** Validates the result of `environment.admin.inspect`. */
export declare function environmentAdminInspectResult(value: unknown): boolean;
/** Validates the params of `environment.admin.mutate`. */
export declare function environmentAdminMutateParams(value: unknown): boolean;
/** Validates the result of `environment.admin.mutate`. */
export declare function environmentAdminMutateResult(value: unknown): boolean;
/** Validates the params of `environment.admin.network`. */
export declare function environmentAdminNetworkParams(value: unknown): boolean;
/** Validates the result of `environment.admin.network`. */
export declare function environmentAdminNetworkResult(value: unknown): boolean;
/** Validates the params of `environment.admin.operation`. */
export declare function environmentAdminOperationParams(value: unknown): boolean;
/** Validates the result of `environment.admin.operation`. */
export declare function environmentAdminOperationResult(value: unknown): boolean;
/** Validates the params of `environment.admin.usage`. */
export declare function environmentAdminUsageParams(value: unknown): boolean;
/** Validates the result of `environment.admin.usage`. */
export declare function environmentAdminUsageResult(value: unknown): boolean;
/** Validates the params of `environment.prepare`. */
export declare function environmentPrepareParams(value: unknown): boolean;
/** Validates the result of `environment.prepare`. */
export declare function environmentPrepareResult(value: unknown): boolean;
/** Validates the params of `environment.status`. */
export declare function environmentStatusParams(value: unknown): boolean;
/** Validates the result of `environment.status`. */
export declare function environmentStatusResult(value: unknown): boolean;
/** Validates the params of `environment.usage`. */
export declare function environmentUsageParams(value: unknown): boolean;
/** Validates the result of `environment.usage`. */
export declare function environmentUsageResult(value: unknown): boolean;
/** Validates the params of `environment.visit`. */
export declare function environmentVisitParams(value: unknown): boolean;
/** Validates the result of `environment.visit`. */
export declare function environmentVisitResult(value: unknown): boolean;
/** Validates the params of `environments.attach`. */
export declare function environmentsAttachParams(value: unknown): boolean;
/** Validates the result of `environments.attach`. */
export declare function environmentsAttachResult(value: unknown): boolean;
/** Validates the params of `environments.detach`. */
export declare function environmentsDetachParams(value: unknown): boolean;
/** Validates the result of `environments.detach`. */
export declare function environmentsDetachResult(value: unknown): boolean;
/** Validates the params of `environments.list`. */
export declare function environmentsListParams(value: unknown): boolean;
/** Validates the result of `environments.list`. */
export declare function environmentsListResult(value: unknown): boolean;
/** Validates the params of `environments.respond`. */
export declare function environmentsRespondParams(value: unknown): boolean;
/** Validates the result of `environments.respond`. */
export declare function environmentsRespondResult(value: unknown): boolean;
/** Validates the params of `health`. */
export declare function healthParams(value: unknown): boolean;
/** Validates the result of `health`. */
export declare function healthResult(value: unknown): boolean;
/** Validates the params of `jobs.add`. */
export declare function jobsAddParams(value: unknown): boolean;
/** Validates the result of `jobs.add`. */
export declare function jobsAddResult(value: unknown): boolean;
/** Validates the params of `jobs.list`. */
export declare function jobsListParams(value: unknown): boolean;
/** Validates the result of `jobs.list`. */
export declare function jobsListResult(value: unknown): boolean;
/** Validates the params of `jobs.remove`. */
export declare function jobsRemoveParams(value: unknown): boolean;
/** Validates the result of `jobs.remove`. */
export declare function jobsRemoveResult(value: unknown): boolean;
/** Validates the params of `logs.tail`. */
export declare function logsTailParams(value: unknown): boolean;
/** Validates the result of `logs.tail`. */
export declare function logsTailResult(value: unknown): boolean;
/** Validates the params of `luau.editor.close`. */
export declare function luauEditorCloseParams(value: unknown): boolean;
/** Validates the result of `luau.editor.close`. */
export declare function luauEditorCloseResult(value: unknown): boolean;
/** Validates the params of `luau.editor.commit`. */
export declare function luauEditorCommitParams(value: unknown): boolean;
/** Validates the result of `luau.editor.commit`. */
export declare function luauEditorCommitResult(value: unknown): boolean;
/** Validates the params of `luau.editor.completion`. */
export declare function luauEditorCompletionParams(value: unknown): boolean;
/** Validates the result of `luau.editor.completion`. */
export declare function luauEditorCompletionResult(value: unknown): boolean;
/** Validates the params of `luau.editor.definition`. */
export declare function luauEditorDefinitionParams(value: unknown): boolean;
/** Validates the result of `luau.editor.definition`. */
export declare function luauEditorDefinitionResult(value: unknown): boolean;
/** Validates the params of `luau.editor.hover`. */
export declare function luauEditorHoverParams(value: unknown): boolean;
/** Validates the result of `luau.editor.hover`. */
export declare function luauEditorHoverResult(value: unknown): boolean;
/** Validates the params of `luau.editor.stage`. */
export declare function luauEditorStageParams(value: unknown): boolean;
/** Validates the result of `luau.editor.stage`. */
export declare function luauEditorStageResult(value: unknown): boolean;
/** Validates the params of `luau.editor.start`. */
export declare function luauEditorStartParams(value: unknown): boolean;
/** Validates the result of `luau.editor.start`. */
export declare function luauEditorStartResult(value: unknown): boolean;
/** Validates the params of `maestro.models.list`. */
export declare function maestroModelsListParams(value: unknown): boolean;
/** Validates the result of `maestro.models.list`. */
export declare function maestroModelsListResult(value: unknown): boolean;
/** Validates the params of `maestro.policy.get`. */
export declare function maestroPolicyGetParams(value: unknown): boolean;
/** Validates the result of `maestro.policy.get`. */
export declare function maestroPolicyGetResult(value: unknown): boolean;
/** Validates the params of `maestro.policy.history`. */
export declare function maestroPolicyHistoryParams(value: unknown): boolean;
/** Validates the result of `maestro.policy.history`. */
export declare function maestroPolicyHistoryResult(value: unknown): boolean;
/** Validates the params of `maestro.policy.restore`. */
export declare function maestroPolicyRestoreParams(value: unknown): boolean;
/** Validates the result of `maestro.policy.restore`. */
export declare function maestroPolicyRestoreResult(value: unknown): boolean;
/** Validates the params of `maestro.policy.set`. */
export declare function maestroPolicySetParams(value: unknown): boolean;
/** Validates the result of `maestro.policy.set`. */
export declare function maestroPolicySetResult(value: unknown): boolean;
/** Validates the params of `maestro.runs.get`. */
export declare function maestroRunsGetParams(value: unknown): boolean;
/** Validates the result of `maestro.runs.get`. */
export declare function maestroRunsGetResult(value: unknown): boolean;
/** Validates the params of `maestro.runs.list`. */
export declare function maestroRunsListParams(value: unknown): boolean;
/** Validates the result of `maestro.runs.list`. */
export declare function maestroRunsListResult(value: unknown): boolean;
/** Validates the params of `media.acknowledge`. */
export declare function mediaAcknowledgeParams(value: unknown): boolean;
/** Validates the result of `media.acknowledge`. */
export declare function mediaAcknowledgeResult(value: unknown): boolean;
/** Validates the params of `processes.input`. */
export declare function processesInputParams(value: unknown): boolean;
/** Validates the result of `processes.input`. */
export declare function processesInputResult(value: unknown): boolean;
/** Validates the params of `processes.list`. */
export declare function processesListParams(value: unknown): boolean;
/** Validates the result of `processes.list`. */
export declare function processesListResult(value: unknown): boolean;
/** Validates the params of `processes.log`. */
export declare function processesLogParams(value: unknown): boolean;
/** Validates the result of `processes.log`. */
export declare function processesLogResult(value: unknown): boolean;
/** Validates the params of `processes.resize`. */
export declare function processesResizeParams(value: unknown): boolean;
/** Validates the result of `processes.resize`. */
export declare function processesResizeResult(value: unknown): boolean;
/** Validates the params of `processes.stop`. */
export declare function processesStopParams(value: unknown): boolean;
/** Validates the result of `processes.stop`. */
export declare function processesStopResult(value: unknown): boolean;
/** Validates the params of `redteam.get`. */
export declare function redteamGetParams(value: unknown): boolean;
/** Validates the result of `redteam.get`. */
export declare function redteamGetResult(value: unknown): boolean;
/** Validates the params of `redteam.list`. */
export declare function redteamListParams(value: unknown): boolean;
/** Validates the result of `redteam.list`. */
export declare function redteamListResult(value: unknown): boolean;
/** Validates the params of `redteam.start`. */
export declare function redteamStartParams(value: unknown): boolean;
/** Validates the result of `redteam.start`. */
export declare function redteamStartResult(value: unknown): boolean;
/** Validates the params of `redteam.stop`. */
export declare function redteamStopParams(value: unknown): boolean;
/** Validates the result of `redteam.stop`. */
export declare function redteamStopResult(value: unknown): boolean;
/** Validates the params of `redteam.update`. */
export declare function redteamUpdateParams(value: unknown): boolean;
/** Validates the result of `redteam.update`. */
export declare function redteamUpdateResult(value: unknown): boolean;
/** Validates the params of `reverse.browser`. */
export declare function reverseBrowserParams(value: unknown): boolean;
/** Validates the result of `reverse.browser`. */
export declare function reverseBrowserResult(value: unknown): boolean;
/** Validates the params of `reverse.browser.modules`. */
export declare function reverseBrowserModulesParams(value: unknown): boolean;
/** Validates the result of `reverse.browser.modules`. */
export declare function reverseBrowserModulesResult(value: unknown): boolean;
/** Validates the params of `reverse.browser.screenshot`. */
export declare function reverseBrowserScreenshotParams(value: unknown): boolean;
/** Validates the result of `reverse.browser.screenshot`. */
export declare function reverseBrowserScreenshotResult(value: unknown): boolean;
/** Validates the params of `reverse.browser.sources`. */
export declare function reverseBrowserSourcesParams(value: unknown): boolean;
/** Validates the result of `reverse.browser.sources`. */
export declare function reverseBrowserSourcesResult(value: unknown): boolean;
/** Validates the params of `reverse.browser.storage`. */
export declare function reverseBrowserStorageParams(value: unknown): boolean;
/** Validates the result of `reverse.browser.storage`. */
export declare function reverseBrowserStorageResult(value: unknown): boolean;
/** Validates the params of `reverse.browser.storage.comparison`. */
export declare function reverseBrowserStorageComparisonParams(value: unknown): boolean;
/** Validates the result of `reverse.browser.storage.comparison`. */
export declare function reverseBrowserStorageComparisonResult(value: unknown): boolean;
/** Validates the params of `reverse.browser.structure`. */
export declare function reverseBrowserStructureParams(value: unknown): boolean;
/** Validates the result of `reverse.browser.structure`. */
export declare function reverseBrowserStructureResult(value: unknown): boolean;
/** Validates the params of `reverse.browser.webmcp`. */
export declare function reverseBrowserWebmcpParams(value: unknown): boolean;
/** Validates the result of `reverse.browser.webmcp`. */
export declare function reverseBrowserWebmcpResult(value: unknown): boolean;
/** Validates the params of `reverse.catalog`. */
export declare function reverseCatalogParams(value: unknown): boolean;
/** Validates the result of `reverse.catalog`. */
export declare function reverseCatalogResult(value: unknown): boolean;
/** Validates the params of `reverse.evidence`. */
export declare function reverseEvidenceParams(value: unknown): boolean;
/** Validates the result of `reverse.evidence`. */
export declare function reverseEvidenceResult(value: unknown): boolean;
/** Validates the params of `reverse.functions`. */
export declare function reverseFunctionsParams(value: unknown): boolean;
/** Validates the result of `reverse.functions`. */
export declare function reverseFunctionsResult(value: unknown): boolean;
/** Validates the params of `reverse.graph`. */
export declare function reverseGraphParams(value: unknown): boolean;
/** Validates the result of `reverse.graph`. */
export declare function reverseGraphResult(value: unknown): boolean;
/** Validates the params of `reverse.inspect`. */
export declare function reverseInspectParams(value: unknown): boolean;
/** Validates the result of `reverse.inspect`. */
export declare function reverseInspectResult(value: unknown): boolean;
/** Validates the params of `reverse.network`. */
export declare function reverseNetworkParams(value: unknown): boolean;
/** Validates the result of `reverse.network`. */
export declare function reverseNetworkResult(value: unknown): boolean;
/** Validates the params of `reverse.network.detail`. */
export declare function reverseNetworkDetailParams(value: unknown): boolean;
/** Validates the result of `reverse.network.detail`. */
export declare function reverseNetworkDetailResult(value: unknown): boolean;
/** Validates the params of `roblox.credentials.remove`. */
export declare function robloxCredentialsRemoveParams(value: unknown): boolean;
/** Validates the result of `roblox.credentials.remove`. */
export declare function robloxCredentialsRemoveResult(value: unknown): boolean;
/** Validates the params of `roblox.credentials.set`. */
export declare function robloxCredentialsSetParams(value: unknown): boolean;
/** Validates the result of `roblox.credentials.set`. */
export declare function robloxCredentialsSetResult(value: unknown): boolean;
/** Validates the params of `roblox.credentials.status`. */
export declare function robloxCredentialsStatusParams(value: unknown): boolean;
/** Validates the result of `roblox.credentials.status`. */
export declare function robloxCredentialsStatusResult(value: unknown): boolean;
/** Validates the params of `roblox.live.close`. */
export declare function robloxLiveCloseParams(value: unknown): boolean;
/** Validates the result of `roblox.live.close`. */
export declare function robloxLiveCloseResult(value: unknown): boolean;
/** Validates the params of `roblox.live.export`. */
export declare function robloxLiveExportParams(value: unknown): boolean;
/** Validates the result of `roblox.live.export`. */
export declare function robloxLiveExportResult(value: unknown): boolean;
/** Validates the params of `roblox.live.start`. */
export declare function robloxLiveStartParams(value: unknown): boolean;
/** Validates the result of `roblox.live.start`. */
export declare function robloxLiveStartResult(value: unknown): boolean;
/** Validates the params of `roblox.live.step`. */
export declare function robloxLiveStepParams(value: unknown): boolean;
/** Validates the result of `roblox.live.step`. */
export declare function robloxLiveStepResult(value: unknown): boolean;
/** Validates the params of `roblox.telemetry.funnel`. */
export declare function robloxTelemetryFunnelParams(value: unknown): boolean;
/** Validates the result of `roblox.telemetry.funnel`. */
export declare function robloxTelemetryFunnelResult(value: unknown): boolean;
/** Validates the params of `roblox.telemetry.performance`. */
export declare function robloxTelemetryPerformanceParams(value: unknown): boolean;
/** Validates the result of `roblox.telemetry.performance`. */
export declare function robloxTelemetryPerformanceResult(value: unknown): boolean;
/** Validates the params of `roblox.telemetry.projects`. */
export declare function robloxTelemetryProjectsParams(value: unknown): boolean;
/** Validates the result of `roblox.telemetry.projects`. */
export declare function robloxTelemetryProjectsResult(value: unknown): boolean;
/** Validates the params of `self.emotions`. */
export declare function selfEmotionsParams(value: unknown): boolean;
/** Validates the result of `self.emotions`. */
export declare function selfEmotionsResult(value: unknown): boolean;
/** Validates the params of `sessions.delete`. */
export declare function sessionsDeleteParams(value: unknown): boolean;
/** Validates the result of `sessions.delete`. */
export declare function sessionsDeleteResult(value: unknown): boolean;
/** Validates the params of `sessions.download`. */
export declare function sessionsDownloadParams(value: unknown): boolean;
/** Validates the result of `sessions.download`. */
export declare function sessionsDownloadResult(value: unknown): boolean;
/** Validates the params of `sessions.files`. */
export declare function sessionsFilesParams(value: unknown): boolean;
/** Validates the result of `sessions.files`. */
export declare function sessionsFilesResult(value: unknown): boolean;
/** Validates the params of `sessions.get`. */
export declare function sessionsGetParams(value: unknown): boolean;
/** Validates the result of `sessions.get`. */
export declare function sessionsGetResult(value: unknown): boolean;
/** Validates the params of `sessions.input`. */
export declare function sessionsInputParams(value: unknown): boolean;
/** Validates the result of `sessions.input`. */
export declare function sessionsInputResult(value: unknown): boolean;
/** Validates the params of `sessions.list`. */
export declare function sessionsListParams(value: unknown): boolean;
/** Validates the result of `sessions.list`. */
export declare function sessionsListResult(value: unknown): boolean;
/** Validates the params of `sessions.maestro.steer`. */
export declare function sessionsMaestroSteerParams(value: unknown): boolean;
/** Validates the result of `sessions.maestro.steer`. */
export declare function sessionsMaestroSteerResult(value: unknown): boolean;
/** Validates the params of `sessions.messages`. */
export declare function sessionsMessagesParams(value: unknown): boolean;
/** Validates the result of `sessions.messages`. */
export declare function sessionsMessagesResult(value: unknown): boolean;
/** Validates the params of `sessions.pin`. */
export declare function sessionsPinParams(value: unknown): boolean;
/** Validates the result of `sessions.pin`. */
export declare function sessionsPinResult(value: unknown): boolean;
/** Validates the params of `sessions.pins`. */
export declare function sessionsPinsParams(value: unknown): boolean;
/** Validates the result of `sessions.pins`. */
export declare function sessionsPinsResult(value: unknown): boolean;
/** Validates the params of `sessions.planning`. */
export declare function sessionsPlanningParams(value: unknown): boolean;
/** Validates the result of `sessions.planning`. */
export declare function sessionsPlanningResult(value: unknown): boolean;
/** Validates the params of `sessions.rename`. */
export declare function sessionsRenameParams(value: unknown): boolean;
/** Validates the result of `sessions.rename`. */
export declare function sessionsRenameResult(value: unknown): boolean;
/** Validates the params of `sessions.retry`. */
export declare function sessionsRetryParams(value: unknown): boolean;
/** Validates the result of `sessions.retry`. */
export declare function sessionsRetryResult(value: unknown): boolean;
/** Validates the params of `sessions.sprint`. */
export declare function sessionsSprintParams(value: unknown): boolean;
/** Validates the result of `sessions.sprint`. */
export declare function sessionsSprintResult(value: unknown): boolean;
/** Validates the params of `sessions.subscribe`. */
export declare function sessionsSubscribeParams(value: unknown): boolean;
/** Validates the result of `sessions.subscribe`. */
export declare function sessionsSubscribeResult(value: unknown): boolean;
/** Validates the params of `sessions.transcript`. */
export declare function sessionsTranscriptParams(value: unknown): boolean;
/** Validates the result of `sessions.transcript`. */
export declare function sessionsTranscriptResult(value: unknown): boolean;
/** Validates the params of `sessions.unpin`. */
export declare function sessionsUnpinParams(value: unknown): boolean;
/** Validates the result of `sessions.unpin`. */
export declare function sessionsUnpinResult(value: unknown): boolean;
/** Validates the params of `sessions.unsubscribe`. */
export declare function sessionsUnsubscribeParams(value: unknown): boolean;
/** Validates the result of `sessions.unsubscribe`. */
export declare function sessionsUnsubscribeResult(value: unknown): boolean;
/** Validates the params of `sessions.versions`. */
export declare function sessionsVersionsParams(value: unknown): boolean;
/** Validates the result of `sessions.versions`. */
export declare function sessionsVersionsResult(value: unknown): boolean;
/** Validates the params of `shares.create`. */
export declare function sharesCreateParams(value: unknown): boolean;
/** Validates the result of `shares.create`. */
export declare function sharesCreateResult(value: unknown): boolean;
/** Validates the params of `shares.list`. */
export declare function sharesListParams(value: unknown): boolean;
/** Validates the result of `shares.list`. */
export declare function sharesListResult(value: unknown): boolean;
/** Validates the params of `shares.remove`. */
export declare function sharesRemoveParams(value: unknown): boolean;
/** Validates the result of `shares.remove`. */
export declare function sharesRemoveResult(value: unknown): boolean;
/** Validates the params of `shares.setMember`. */
export declare function sharesSetMemberParams(value: unknown): boolean;
/** Validates the result of `shares.setMember`. */
export declare function sharesSetMemberResult(value: unknown): boolean;
/** Validates the params of `tasks.cancel`. */
export declare function tasksCancelParams(value: unknown): boolean;
/** Validates the result of `tasks.cancel`. */
export declare function tasksCancelResult(value: unknown): boolean;
/** Validates the params of `tasks.get`. */
export declare function tasksGetParams(value: unknown): boolean;
/** Validates the result of `tasks.get`. */
export declare function tasksGetResult(value: unknown): boolean;
/** Validates the params of `tasks.list`. */
export declare function tasksListParams(value: unknown): boolean;
/** Validates the result of `tasks.list`. */
export declare function tasksListResult(value: unknown): boolean;
/** Validates the params of `teams.create`. */
export declare function teamsCreateParams(value: unknown): boolean;
/** Validates the result of `teams.create`. */
export declare function teamsCreateResult(value: unknown): boolean;
/** Validates the params of `teams.list`. */
export declare function teamsListParams(value: unknown): boolean;
/** Validates the result of `teams.list`. */
export declare function teamsListResult(value: unknown): boolean;
/** Validates the params of `teams.remove`. */
export declare function teamsRemoveParams(value: unknown): boolean;
/** Validates the result of `teams.remove`. */
export declare function teamsRemoveResult(value: unknown): boolean;
/** Validates the params of `teams.setMember`. */
export declare function teamsSetMemberParams(value: unknown): boolean;
/** Validates the result of `teams.setMember`. */
export declare function teamsSetMemberResult(value: unknown): boolean;
/** Validates the params of `voice.audio`. */
export declare function voiceAudioParams(value: unknown): boolean;
/** Validates the result of `voice.audio`. */
export declare function voiceAudioResult(value: unknown): boolean;
/** Validates the params of `voice.start`. */
export declare function voiceStartParams(value: unknown): boolean;
/** Validates the result of `voice.start`. */
export declare function voiceStartResult(value: unknown): boolean;
/** Validates the params of `voice.stop`. */
export declare function voiceStopParams(value: unknown): boolean;
/** Validates the result of `voice.stop`. */
export declare function voiceStopResult(value: unknown): boolean;
/** Validates the params of `workflows.attention.list`. */
export declare function workflowsAttentionListParams(value: unknown): boolean;
/** Validates the result of `workflows.attention.list`. */
export declare function workflowsAttentionListResult(value: unknown): boolean;
/** Validates the params of `workflows.catalog`. */
export declare function workflowsCatalogParams(value: unknown): boolean;
/** Validates the result of `workflows.catalog`. */
export declare function workflowsCatalogResult(value: unknown): boolean;
/** Validates the params of `workflows.create`. */
export declare function workflowsCreateParams(value: unknown): boolean;
/** Validates the result of `workflows.create`. */
export declare function workflowsCreateResult(value: unknown): boolean;
/** Validates the params of `workflows.delete`. */
export declare function workflowsDeleteParams(value: unknown): boolean;
/** Validates the result of `workflows.delete`. */
export declare function workflowsDeleteResult(value: unknown): boolean;
/** Validates the params of `workflows.list`. */
export declare function workflowsListParams(value: unknown): boolean;
/** Validates the result of `workflows.list`. */
export declare function workflowsListResult(value: unknown): boolean;
/** Validates the params of `workflows.models`. */
export declare function workflowsModelsParams(value: unknown): boolean;
/** Validates the result of `workflows.models`. */
export declare function workflowsModelsResult(value: unknown): boolean;
/** Validates the params of `workflows.models.image.quote`. */
export declare function workflowsModelsImageQuoteParams(value: unknown): boolean;
/** Validates the result of `workflows.models.image.quote`. */
export declare function workflowsModelsImageQuoteResult(value: unknown): boolean;
/** Validates the params of `workflows.models.image.resolve`. */
export declare function workflowsModelsImageResolveParams(value: unknown): boolean;
/** Validates the result of `workflows.models.image.resolve`. */
export declare function workflowsModelsImageResolveResult(value: unknown): boolean;
/** Validates the params of `workflows.models.refresh`. */
export declare function workflowsModelsRefreshParams(value: unknown): boolean;
/** Validates the result of `workflows.models.refresh`. */
export declare function workflowsModelsRefreshResult(value: unknown): boolean;
/** Validates the params of `workflows.models.resolve`. */
export declare function workflowsModelsResolveParams(value: unknown): boolean;
/** Validates the result of `workflows.models.resolve`. */
export declare function workflowsModelsResolveResult(value: unknown): boolean;
/** Validates the params of `workflows.planning.cancel`. */
export declare function workflowsPlanningCancelParams(value: unknown): boolean;
/** Validates the result of `workflows.planning.cancel`. */
export declare function workflowsPlanningCancelResult(value: unknown): boolean;
/** Validates the params of `workflows.planning.history`. */
export declare function workflowsPlanningHistoryParams(value: unknown): boolean;
/** Validates the result of `workflows.planning.history`. */
export declare function workflowsPlanningHistoryResult(value: unknown): boolean;
/** Validates the params of `workflows.planning.read`. */
export declare function workflowsPlanningReadParams(value: unknown): boolean;
/** Validates the result of `workflows.planning.read`. */
export declare function workflowsPlanningReadResult(value: unknown): boolean;
/** Validates the params of `workflows.planning.send`. */
export declare function workflowsPlanningSendParams(value: unknown): boolean;
/** Validates the result of `workflows.planning.send`. */
export declare function workflowsPlanningSendResult(value: unknown): boolean;
/** Validates the params of `workflows.planning.sources`. */
export declare function workflowsPlanningSourcesParams(value: unknown): boolean;
/** Validates the result of `workflows.planning.sources`. */
export declare function workflowsPlanningSourcesResult(value: unknown): boolean;
/** Validates the params of `workflows.publications.check`. */
export declare function workflowsPublicationsCheckParams(value: unknown): boolean;
/** Validates the result of `workflows.publications.check`. */
export declare function workflowsPublicationsCheckResult(value: unknown): boolean;
/** Validates the params of `workflows.publications.list`. */
export declare function workflowsPublicationsListParams(value: unknown): boolean;
/** Validates the result of `workflows.publications.list`. */
export declare function workflowsPublicationsListResult(value: unknown): boolean;
/** Validates the params of `workflows.publications.publish`. */
export declare function workflowsPublicationsPublishParams(value: unknown): boolean;
/** Validates the result of `workflows.publications.publish`. */
export declare function workflowsPublicationsPublishResult(value: unknown): boolean;
/** Validates the params of `workflows.publications.read`. */
export declare function workflowsPublicationsReadParams(value: unknown): boolean;
/** Validates the result of `workflows.publications.read`. */
export declare function workflowsPublicationsReadResult(value: unknown): boolean;
/** Validates the params of `workflows.publications.run`. */
export declare function workflowsPublicationsRunParams(value: unknown): boolean;
/** Validates the result of `workflows.publications.run`. */
export declare function workflowsPublicationsRunResult(value: unknown): boolean;
/** Validates the params of `workflows.read`. */
export declare function workflowsReadParams(value: unknown): boolean;
/** Validates the result of `workflows.read`. */
export declare function workflowsReadResult(value: unknown): boolean;
/** Validates the params of `workflows.record`. */
export declare function workflowsRecordParams(value: unknown): boolean;
/** Validates the result of `workflows.record`. */
export declare function workflowsRecordResult(value: unknown): boolean;
/** Validates the params of `workflows.records`. */
export declare function workflowsRecordsParams(value: unknown): boolean;
/** Validates the result of `workflows.records`. */
export declare function workflowsRecordsResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.agent.control`. */
export declare function workflowsRunsAgentControlParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.agent.control`. */
export declare function workflowsRunsAgentControlResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.agent.input`. */
export declare function workflowsRunsAgentInputParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.agent.input`. */
export declare function workflowsRunsAgentInputResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.agent.read`. */
export declare function workflowsRunsAgentReadParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.agent.read`. */
export declare function workflowsRunsAgentReadResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.approval.decide`. */
export declare function workflowsRunsApprovalDecideParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.approval.decide`. */
export declare function workflowsRunsApprovalDecideResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.artifact`. */
export declare function workflowsRunsArtifactParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.artifact`. */
export declare function workflowsRunsArtifactResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.artifacts`. */
export declare function workflowsRunsArtifactsParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.artifacts`. */
export declare function workflowsRunsArtifactsResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.attempts`. */
export declare function workflowsRunsAttemptsParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.attempts`. */
export declare function workflowsRunsAttemptsResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.cancel`. */
export declare function workflowsRunsCancelParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.cancel`. */
export declare function workflowsRunsCancelResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.events`. */
export declare function workflowsRunsEventsParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.events`. */
export declare function workflowsRunsEventsResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.inputs`. */
export declare function workflowsRunsInputsParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.inputs`. */
export declare function workflowsRunsInputsResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.list`. */
export declare function workflowsRunsListParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.list`. */
export declare function workflowsRunsListResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.loopPricing`. */
export declare function workflowsRunsLoopPricingParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.loopPricing`. */
export declare function workflowsRunsLoopPricingResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.loopSpending`. */
export declare function workflowsRunsLoopSpendingParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.loopSpending`. */
export declare function workflowsRunsLoopSpendingResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.output`. */
export declare function workflowsRunsOutputParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.output`. */
export declare function workflowsRunsOutputResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.question.answer`. */
export declare function workflowsRunsQuestionAnswerParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.question.answer`. */
export declare function workflowsRunsQuestionAnswerResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.question.read`. */
export declare function workflowsRunsQuestionReadParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.question.read`. */
export declare function workflowsRunsQuestionReadResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.questions`. */
export declare function workflowsRunsQuestionsParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.questions`. */
export declare function workflowsRunsQuestionsResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.read`. */
export declare function workflowsRunsReadParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.read`. */
export declare function workflowsRunsReadResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.start`. */
export declare function workflowsRunsStartParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.start`. */
export declare function workflowsRunsStartResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.steps`. */
export declare function workflowsRunsStepsParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.steps`. */
export declare function workflowsRunsStepsResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.terminal.command`. */
export declare function workflowsRunsTerminalCommandParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.terminal.command`. */
export declare function workflowsRunsTerminalCommandResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.terminal.read`. */
export declare function workflowsRunsTerminalReadParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.terminal.read`. */
export declare function workflowsRunsTerminalReadResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.usage`. */
export declare function workflowsRunsUsageParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.usage`. */
export declare function workflowsRunsUsageResult(value: unknown): boolean;
/** Validates the params of `workflows.runs.usageBreakdown`. */
export declare function workflowsRunsUsageBreakdownParams(value: unknown): boolean;
/** Validates the result of `workflows.runs.usageBreakdown`. */
export declare function workflowsRunsUsageBreakdownResult(value: unknown): boolean;
/** Validates the params of `workflows.save`. */
export declare function workflowsSaveParams(value: unknown): boolean;
/** Validates the result of `workflows.save`. */
export declare function workflowsSaveResult(value: unknown): boolean;
/** Validates the params of `workflows.schedules.disable`. */
export declare function workflowsSchedulesDisableParams(value: unknown): boolean;
/** Validates the result of `workflows.schedules.disable`. */
export declare function workflowsSchedulesDisableResult(value: unknown): boolean;
/** Validates the params of `workflows.schedules.enable`. */
export declare function workflowsSchedulesEnableParams(value: unknown): boolean;
/** Validates the result of `workflows.schedules.enable`. */
export declare function workflowsSchedulesEnableResult(value: unknown): boolean;
/** Validates the params of `workflows.schedules.preview`. */
export declare function workflowsSchedulesPreviewParams(value: unknown): boolean;
/** Validates the result of `workflows.schedules.preview`. */
export declare function workflowsSchedulesPreviewResult(value: unknown): boolean;
/** Validates the params of `workflows.schedules.read`. */
export declare function workflowsSchedulesReadParams(value: unknown): boolean;
/** Validates the result of `workflows.schedules.read`. */
export declare function workflowsSchedulesReadResult(value: unknown): boolean;
/** Validates the params of `workflows.validate`. */
export declare function workflowsValidateParams(value: unknown): boolean;
/** Validates the result of `workflows.validate`. */
export declare function workflowsValidateResult(value: unknown): boolean;
/** Validates the params of `workspace.files.cancel`. */
export declare function workspaceFilesCancelParams(value: unknown): boolean;
/** Validates the result of `workspace.files.cancel`. */
export declare function workspaceFilesCancelResult(value: unknown): boolean;
/** Validates the params of `workspace.files.chunk`. */
export declare function workspaceFilesChunkParams(value: unknown): boolean;
/** Validates the result of `workspace.files.chunk`. */
export declare function workspaceFilesChunkResult(value: unknown): boolean;
/** Validates the params of `workspace.files.finish`. */
export declare function workspaceFilesFinishParams(value: unknown): boolean;
/** Validates the result of `workspace.files.finish`. */
export declare function workspaceFilesFinishResult(value: unknown): boolean;
/** Validates the params of `workspace.files.list`. */
export declare function workspaceFilesListParams(value: unknown): boolean;
/** Validates the result of `workspace.files.list`. */
export declare function workspaceFilesListResult(value: unknown): boolean;
/** Validates the params of `workspace.files.mkdir`. */
export declare function workspaceFilesMkdirParams(value: unknown): boolean;
/** Validates the result of `workspace.files.mkdir`. */
export declare function workspaceFilesMkdirResult(value: unknown): boolean;
/** Validates the params of `workspace.files.read`. */
export declare function workspaceFilesReadParams(value: unknown): boolean;
/** Validates the result of `workspace.files.read`. */
export declare function workspaceFilesReadResult(value: unknown): boolean;
/** Validates the params of `workspace.files.remove`. */
export declare function workspaceFilesRemoveParams(value: unknown): boolean;
/** Validates the result of `workspace.files.remove`. */
export declare function workspaceFilesRemoveResult(value: unknown): boolean;
/** Validates the params of `workspace.files.rename`. */
export declare function workspaceFilesRenameParams(value: unknown): boolean;
/** Validates the result of `workspace.files.rename`. */
export declare function workspaceFilesRenameResult(value: unknown): boolean;
/** Validates the params of `workspace.files.start`. */
export declare function workspaceFilesStartParams(value: unknown): boolean;
/** Validates the result of `workspace.files.start`. */
export declare function workspaceFilesStartResult(value: unknown): boolean;
/** Validates the params of `workspaces.create`. */
export declare function workspacesCreateParams(value: unknown): boolean;
/** Validates the result of `workspaces.create`. */
export declare function workspacesCreateResult(value: unknown): boolean;
/** Validates the params of `workspaces.describe`. */
export declare function workspacesDescribeParams(value: unknown): boolean;
/** Validates the result of `workspaces.describe`. */
export declare function workspacesDescribeResult(value: unknown): boolean;
/** Validates the params of `workspaces.destroy`. */
export declare function workspacesDestroyParams(value: unknown): boolean;
/** Validates the result of `workspaces.destroy`. */
export declare function workspacesDestroyResult(value: unknown): boolean;
/** Validates the params of `workspaces.list`. */
export declare function workspacesListParams(value: unknown): boolean;
/** Validates the result of `workspaces.list`. */
export declare function workspacesListResult(value: unknown): boolean;
/** Validates the params of `workspaces.page`. */
export declare function workspacesPageParams(value: unknown): boolean;
/** Validates the result of `workspaces.page`. */
export declare function workspacesPageResult(value: unknown): boolean;
/** Validates the params of `workspaces.visit`. */
export declare function workspacesVisitParams(value: unknown): boolean;
/** Validates the result of `workspaces.visit`. */
export declare function workspacesVisitResult(value: unknown): boolean;
