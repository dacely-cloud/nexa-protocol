import type { AgentDefinition } from '../agent/AgentDefinition.js';
import type { SteeringImage } from './AttachmentTypes.js';
import type { AgentProfileCreateParams, AgentProfileDeleteParams, AgentProfileUpdateParams, AgentProfileUpgradeParams, AgentProfilesResult } from '../agent/ProfileTypes.js';
import type { AgileSessionCommand, AgileView } from '../agile/interface/AgileView.js';
import type { DataUploadChunkParams, DataUploadIdParams, DataUploadStartParams } from '../analytics/ConversationUploadRequests.js';
import type { ConversationDataFile, ConversationDataUpload } from '../analytics/ConversationUploadTypes.js';
import type { DataUploadCreateParams, DataUploadSelectParams, DataUploadSelectionResult, DataUploadTarget, DataUploadTargetParams } from '../analytics/DataUploadTargetTypes.js';
import type { DataUploadPosition } from '../analytics/DataUploadTypes.js';
import type { DeadLetter } from '../channels/DeadLetterTypes.js';
import type { ConnectionApplicationsCheckMethod, ConnectionApplicationsSetupMethod, ConnectionModelsListMethod, ConnectionToolsInstallMethod, ConnectionToolsRemoveMethod, ConnectionToolsStatusMethod } from '../connections/ConnectionTypes.js';
import type { Budget, BudgetEnforcement, BudgetPeriod, CreditScope, CreditSummary } from '../credit/Types.js';
import type { WalletHistoryPage, WalletSnapshot } from '../credit/WalletReadTypes.js';
import type { ResetAllowanceParams, ResetAllowanceResult, ResetHistoryPage, ResetSnapshot } from '../credit/WalletResetTypes.js';
import type { ConnectorContextCheckMethod } from '../dataplane/ConnectorContextCheckTypes.js';
import type { ConnectorExecutionOutputMethod } from '../dataplane/ConnectorExecutionOutput.js';
import type { ConnectorExecuteMethod, ConnectorExecutionCurrentJobsMethod, ConnectorExecutionMethod, ConnectorExecutionResultMethod, ConnectorExecutionStopMethod } from '../dataplane/ConnectorExecutionTypes.js';
import type { ConnectorHostResultMethod, ConnectorHostStatusMethod, ConnectorHostSubmitMethod } from '../dataplane/ConnectorHostTypes.js';
import type { ConnectorInstructionsGetMethod, ConnectorInstructionsUpdateMethod } from '../dataplane/ConnectorInstructionsTypes.js';
import type { ConnectorInventoryMethod } from '../dataplane/ConnectorInventoryTypes.js';
import type { ConnectorFilesystemMethod, ConnectorGetMethod, ConnectorLinkApproveMethod, ConnectorLinkDenyMethod, ConnectorLinkReviewMethod, ConnectorListMethod, ConnectorResultMethod, ConnectorRevokeMethod, ConnectorSubmitMethod } from '../dataplane/ConnectorTypes.js';
import type { ConnectorWorkspaceCatalogMethod, ConnectorWorkspaceClearMethod, ConnectorWorkspaceCreateMethod, ConnectorWorkspaceGetMethod, ConnectorWorkspaceSelectHostMethod, ConnectorWorkspaceSelectJointMethod, ConnectorWorkspaceSelectMethod } from '../dataplane/ConnectorWorkspaceSelectionTypes.js';
import type { WorkspacePreferenceGetMethod, WorkspacePreferenceSetMethod } from '../dataplane/WorkspacePreferenceTypes.js';
import type { EnvironmentPrepareMethod, EnvironmentStatusMethod } from '../dataplane/EnvironmentPreparationTypes.js';
import type { EnvironmentVisitMethod } from '../dataplane/EnvironmentVisitTypes.js';
import type { VmAdministrationInspectMethod, VmAdministrationOperationMethod, VmAdministrationMutateMethod } from '../dataplane/VmAdministrationTypes.js';
import type { VmFleetMethod } from '../dataplane/VmFleetTypes.js';
import type { VmUsageNetworkMethod } from '../dataplane/VmUsageNetworkTypes.js';
import type { VmUsageAdministrativeMethod, VmUsageMethod } from '../dataplane/VmUsageTypes.js';
import type { DecisionRunParams, DecisionRunResult } from '../decision/DecisionTypes.js';
import type { DesignAssetCancelMethod, DesignAssetChunkMethod, DesignAssetFinishMethod, DesignAssetListMethod, DesignAssetReadMethod, DesignAssetRemoveMethod, DesignAssetStartMethod, DesignAssetThumbnailMethod } from '../design/DesignAssetTypes.js';
import type { DesignCanvasMethod, DesignCanvasMetricsMethod } from '../design/DesignCanvasTypes.js';
import type { DesignColorReadMethod } from '../design/DesignColorReadTypes.js';
import type { DesignCommentTextMethod, DesignCommentsMethod } from '../design/DesignCommentReadTypes.js';
import type { DesignFontListMethod, DesignFontReadMethod } from '../design/DesignFontTypes.js';
import type { DesignLayoutPreviewMethod } from '../design/DesignLayoutPreviewTypes.js';
import type { DesignPatternTileMethod } from '../design/DesignPatternTileTypes.js';
import type { DesignArrangeMethod, DesignChangesMethod, DesignClipboardCopyMethod, DesignClipboardCutMethod, DesignClipboardPasteMethod, DesignComponentMethod, DesignCreateMethod, DesignDeleteMethod, DesignDuplicateMethod, DesignEventsMethod, DesignImportMethod, DesignLayoutMethod, DesignListMethod, DesignReadMethod, DesignSaveMethod, DesignSvgImportMethod, DesignTransferMethod, DesignUndoMethod } from '../design/DesignRpcMethods.js';
import type { DesignTextWindowMethod } from '../design/DesignTextWindowTypes.js';
import type { DesignViewMethod } from '../design/DesignViewTypes.js';
import type { LogFields, LogLevel } from '../logger/LogTypes.js';
import type { ModelMessage } from '../providers/Types.js';
import type { ReverseCatalogPage, ReverseCatalogQuery, ReverseEvidencePage, ReverseEvidenceQuery } from '../reverse/ArchiveTypes.js';
import type { ReverseBrowserPage, ReverseBrowserQuery } from '../reverse/BrowserCaptureTypes.js';
import type { BrowserModulePage, BrowserModuleQuery } from '../reverse/BrowserModuleDirectoryTypes.js';
import type { BrowserScreenshotPage, BrowserScreenshotQuery } from '../reverse/BrowserScreenshotTypes.js';
import type { BrowserSourcesPage, BrowserSourcesQuery } from '../reverse/BrowserSourcesDirectoryTypes.js';
import type { BrowserStorageComparisonPage, BrowserStorageComparisonQuery } from '../reverse/BrowserStorageComparisonTypes.js';
import type { BrowserStoragePage, BrowserStorageQuery } from '../reverse/BrowserStorageTypes.js';
import type { BrowserStructurePage, BrowserStructureQuery } from '../reverse/BrowserStructureTypes.js';
import type { BrowserWebMcpPage, BrowserWebMcpQuery } from '../reverse/BrowserWebMcpDirectoryTypes.js';
import type { ReverseGraphPage, ReverseGraphQuery } from '../reverse/GraphTypes.js';
import type { ReverseFunctionsPage, ReverseFunctionsQuery, ReverseInspectQuery, ReverseInspectResult } from '../reverse/NavigationTypes.js';
import type { ReverseNetworkDetailPage, ReverseNetworkDetailQuery } from '../reverse/NetworkDetailTypes.js';
import type { ReverseNetworkDirectoryPage, ReverseNetworkDirectoryQuery } from '../reverse/NetworkDirectoryTypes.js';
import type { LuauEditorAck, LuauEditorCommit, LuauEditorCompletion, LuauEditorDefinition, LuauEditorHandle, LuauEditorHover, LuauEditorQuery, LuauEditorReport, LuauEditorSourcePart } from '../roblox/analysis/LuauEditorWire.js';
import type { RobloxLiveClosed, RobloxLiveExport, RobloxLiveFrame, RobloxLiveHandleRequest, RobloxLiveStartRequest, RobloxLiveStepRequest } from '../roblox/preview/RobloxLiveWire.js';
import type { FunnelReport } from '../roblox/telemetry/FunnelTypes.js';
import type { PerformanceReport } from '../roblox/telemetry/PerformanceTypes.js';
import type { TelemetryProject } from '../roblox/telemetry/StoreTypes.js';
import type { Job } from '../scheduler/Types.js';
import type { EmotionalReadMethod } from '../self/EmotionTypes.js';
import type { Session } from '../session/SessionTypes.js';
import type { GraphValidation } from '../workflows/GraphTypes.js';
import type { WorkflowImageResolution, WorkflowImageResolutionRequest } from '../workflows/ImageResolutionTypes.js';
import type { WorkflowModelResolution, WorkflowModelResolutionRequest } from '../workflows/ModelResolutionTypes.js';
import type { PlanningSourcesPage, PlanningSourcesRequest } from '../workflows/planning/PlanningSourceTypes.js';
import type { PlanningHistory, PlanningHistoryRequest, PlanningRequest, PlanningTurn, PlanningTurnRef } from '../workflows/planning/PlanningTypes.js';
import type { WorkflowPublication, WorkflowPublicationCheck, WorkflowPublicationCheckRequest, WorkflowPublicationListRequest, WorkflowPublicationPage, WorkflowPublicationReadRequest, WorkflowPublishRequest, WorkflowPublishResult, WorkflowPublishedRunRequest } from '../workflows/PublicationTypes.js';
import type { WorkflowApprovalDecision } from '../workflows/runtime/RunApprovalTypes.js';
import type { WorkflowArtifactListPage, WorkflowArtifactListRequest, WorkflowRunArtifactPage, WorkflowRunArtifactRequest } from '../workflows/runtime/RunArtifactTypes.js';
import type { WorkflowAttentionPage, WorkflowAttentionQuery } from '../workflows/runtime/RunAttentionTypes.js';
import type { WorkflowRunBreakdownRequest, WorkflowRunBreakdownView } from '../workflows/runtime/RunBreakdownTypes.js';
import type { WorkflowHumanIdentity } from '../workflows/runtime/RunHumanIdentity.js';
import type { WorkflowHumanAnswer, WorkflowHumanPage, WorkflowHumanRequest } from '../workflows/runtime/RunHumanTypes.js';
import type { WorkflowAgentControlRequest, WorkflowAgentInputRequest, WorkflowAgentSession, WorkflowAgentSessionRequest, WorkflowRunAttemptsPage, WorkflowRunAttemptsRequest, WorkflowRunEventsRequest, WorkflowRunListPage, WorkflowRunListRequest, WorkflowRunOutputPage, WorkflowRunOutputRequest, WorkflowRunRequest, WorkflowRunStartRequest, WorkflowRunStepsPage, WorkflowRunStepsRequest } from '../workflows/runtime/RunRequests.js';
import type { WorkflowLoopSpendingRequest, WorkflowLoopSpendingView } from '../workflows/runtime/RunSpendingTypes.js';
import type { WorkflowRunEvent, WorkflowRunSummary } from '../workflows/runtime/RunTypes.js';
import type { WorkflowRunUsageRequest, WorkflowRunUsageView } from '../workflows/runtime/RunUsageTypes.js';
import type { WorkflowScheduleCommand, WorkflowScheduleEnable, WorkflowSchedulePreview, WorkflowScheduleRead, WorkflowScheduleView } from '../workflows/schedule/ScheduleTypes.js';
import type { WorkflowTerminalCommand, WorkflowTerminalRequest, WorkflowTerminalSnapshot } from '../workflows/terminal/TerminalTypes.js';
import type { WorkflowImageQuote, WorkflowImageQuoteRequest } from '../workflows/WorkflowImageQuoteTypes.js';
import type { WorkflowModelsPage, WorkflowModelsRequest } from '../workflows/WorkflowModelTypes.js';
import type { WorkflowReceipt } from '../workflows/WorkflowPrimitives.js';
import type { WorkflowCatalog, WorkflowCreateRequest, WorkflowDeleteReceipt, WorkflowDeleteRequest, WorkflowListRequest, WorkflowManifestPage, WorkflowReadRequest, WorkflowRecordPage, WorkflowRecordRequest, WorkflowRecordsPage, WorkflowRecordsRequest, WorkflowSaveRequest, WorkflowValidateRequest } from '../workflows/WorkflowRequests.js';
import type { WorkflowListPage } from '../workflows/WorkflowTypes.js';
import type { BrowserFilesChunkParams, BrowserFilesDone, BrowserFilesListParams, BrowserFilesPage, BrowserFilesPosition, BrowserFilesRead, BrowserFilesReadParams, BrowserFilesRenameParams, BrowserFilesStartParams, BrowserFilesTarget, BrowserFilesUpload, BrowserFilesUploadParams } from '../workspace/BrowserFilesTypes.js';
import type { Workspace, WorkspacePage } from '../workspace/Types.js';
import type { WorkspaceDescription } from '../workspace/WorkspaceManagerTypes.js';
import type { BackgroundProcess, BackgroundProcessLog, BackgroundProcessRef, ProcessInput, ProcessLogRef, ProcessResize } from './BackgroundProcessTypes.js';
import type { ConversationInput, ConversationPin, ConversationPinParams, ConversationPinsPage, ConversationPinsParams, ConversationRenameParams, ConversationRetryParams, ConversationRetryResult, ConversationUnpinParams } from './ConversationTypes.js';
import type { GatewayLimits } from './GatewayLimits.js';
import type { Scope } from './GatewayScopeTypes.js';
import type { SessionHistoryPage, SessionHistoryParams } from './HistoryTypes.js';
import type { SessionFileListParams } from './interface/SessionFileListParams.js';
import type { SessionFilePage } from './interface/SessionFilePage.js';
import type { ApprovalRequestedData, AskParams, AskResult } from './ProtocolEventTypes.js';
import type { RedTeamGetMethod, RedTeamListMethod, RedTeamStartMethod, RedTeamStopMethod, RedTeamUpdateMethod } from './RedTeamMethods.js';
import type { RobloxCredentialSetParams, RobloxCredentialStatus } from './RobloxCredentialTypes.js';
import type { TelemetryFunnelParams, TelemetryPerformanceParams } from './TelemetryParams.js';
import type { JsonValue } from '../json/JsonValue.js';
/** The payload of a {@link GATEWAY_EVENTS.ConnectChallenge}. */
export interface ConnectChallengeData {
    /** Echoed back in {@link ConnectParams.nonce}. */
    readonly nonce: string;
    /** The server's clock when the challenge was issued. */
    readonly ts: number;
    readonly protocol: number;
    readonly minProtocol: number;
}
/** How a client identifies itself in the handshake. */
export interface ConnectClientInfo {
    /** Stable per install, so a reconnect is recognisable in the logs. */
    readonly id: string;
    readonly version: string;
    readonly platform: string;
    readonly mode: 'cli' | 'ui' | 'tui' | 'node' | 'automation';
    /** Deliver saved file descriptors; clients explicitly request original bytes. */
    readonly metadataOnlyAttachments?: boolean;
    /** False skips background VM wake for clients that only need stateless model decisions. */
    readonly workspace?: boolean;
}
/** The `connect` frame's params. */
export interface ConnectParams {
    /** The challenge nonce, proving the client read the server's first frame. */
    readonly nonce: string;
    /** The oldest protocol the client can speak. */
    readonly minProtocol: number;
    /** The newest protocol the client can speak. */
    readonly maxProtocol: number;
    readonly client: ConnectClientInfo;
}
/**
 * The server's answer to `connect`: everything a client needs before it sends anything else.
 *
 * Advertised rather than documented, and that is the whole point of the frame. A client that reads
 * its method list, its event list, its own scopes and the server's limits off the wire cannot be
 * wrong about any of them, and raising a limit or adding a method does not require a client release.
 */
/** Methods, events, and additive capabilities supported by this gateway. */
export interface GatewayFeatures {
    /** Read-only Tidy previews retain deferred text and exact owner-scoped font geometry. */
    readonly designTidyPreview?: true;
    /** Compact tidy commands arrange free selections without replacing their source bodies. */
    readonly designTidy?: true;
    /** Layout gaps accept signed values and use occupied bounds for overlapping flow and grid tracks. */
    readonly designSignedGaps?: true;
    /** Native Resize commands preserve normalized anchors through one-axis sizing and content reflow. */
    readonly designResizeAnchors?: true;
    /** Linked component paints support revision-pinned bounded source-cell sampling. */
    readonly designVectorPatterns?: true;
    /** Component commands can place editable linked grids without copying source artwork. */
    readonly designComponentRepeat?: true;
    /** Stroke phase is editable and preserved by SVG, glyph windows and Boolean silhouettes. */
    readonly designStrokeDashOffset?: true;
    /** Supports coarse per-turn regional context for news and local information. */
    readonly userRegion?: true;
    /** Per-turn optional AI completion audits retain mandatory local checks. */
    readonly modelReview?: true;
    /** Native image framing supports rotation, reflection, affine placement and repeated image tiles. */
    readonly designImageTransforms?: true;
    /** Non-destructive color controls are shared by image layers, fills, strokes and exports. */
    readonly designImageAdjustments?: true;
    /** Repeat cells retain independent image content transforms and original source crops. */
    readonly designImageTiles?: true;
    /** Native layer blending and explicit group isolation preserve editable appearance. */
    readonly designLayerCompositing?: true;
    /** Native typography supports paragraph direction and shared Unicode ordering. */
    readonly designTextDirection?: true;
    /** Native glyph windows can preserve shared shaping with bounded paint clips. */
    readonly designTextPaintClipping?: true;
    /** Rich typography can inherit the layer's gradient, image or solid fill stack. */
    readonly designTextInheritedPaint?: true;
    /** UTF-16 rich ranges can replace layer fills with their own editable paint stacks. */
    readonly designTextRangeFills?: true;
    /** Angular and diamond gradient paints, geometry and compact edits. */
    readonly designExtendedGradients?: true;
    /** Physical mouse/touch gestures can choose buttons using native GUI coordinates. */
    readonly robloxCoordinateInput?: true;
    /** Focused TextBoxes accept bounded Unicode edits and logical editing-key gestures. */
    readonly robloxTextEditing?: true;
    /** Host validation of JSON final answers while native tools remain available. */
    readonly jsonReplies?: true;
    /** Owner-scoped draft storage with bounded reads and revision-safe direct patches. */
    readonly workflowPlanningVersion?: 1;
    readonly workflowDraftsVersion?: 1;
    /** Exact component catalog and structural validation of pinned drafts. */
    readonly workflowGraphVersion?: 1;
    /** Saved parent-local groups, published aliases and paginated immutable group records. */
    readonly workflowGroupsVersion?: 1;
    /** Durable core workflow test runs and bounded output inspection. */
    readonly workflowRunsVersion?: 1;
    /** Durable complete presentation history and binary restoration. */
    readonly sessionHistory?: true;
    /** History batches use acknowledged raw binary frames. */
    readonly binaryHistory?: true;
    /** Session subscriptions notify exact journal ranges for live catch-up. */
    readonly sessionHistoryUpdates?: true;
    /** Compact persisted NDJSON blocks, read in bounded byte pages. */
    readonly transcriptBlocks?: true;
    /** User media attachments are validated and forwarded to the agent. */
    readonly attachments?: true;
    /** Active turns accept inline images alongside steering text. */
    readonly steeringImages?: true;
    /** NXMD frames carry outbound file bytes; JSON results contain matching metadata. */
    readonly binaryMedia?: true;
    /** Disk upload chunks retain raw bytes from the wire through durable storage. */
    readonly binaryDataUploads?: true;
    /** Concurrent workspace upload chunks per upload, each acknowledged with its own end offset. */
    readonly workspaceFilesChunksInFlight?: number;
    readonly methods: readonly string[];
    readonly events: readonly string[];
    /**
     * The scope each method requires.
     *
     * Sent because the alternative is every client shipping its own copy of the server's
     * authorization table, which then drifts: a UI that greys out the wrong button is a support
     * ticket, and one that offers a button the server refuses is worse.
     */
    readonly methodScopes: Readonly<Record<string, Scope>>;
}
/** The connect result: the negotiated protocol, the authenticated identity, the gateway features and its limits. */
export interface HelloOk {
    readonly type: 'hello-ok';
    readonly protocol: number;
    readonly minProtocol: number;
    readonly server: {
        readonly version: string;
        readonly connId: string;
    };
    readonly features: GatewayFeatures;
    readonly auth: {
        readonly principalId: string;
        readonly method: 'none' | 'token' | 'device';
        /** Newly issued device credential, delivered to browser clients unable to read upgrade headers. */
        readonly token?: string;
        readonly scopes: readonly Scope[];
    };
    readonly policy: {
        /** Resource budgets advertised by gateways supporting bounded admission. */
        readonly limits?: Readonly<GatewayLimits>;
        readonly maxPayloadBytes: number;
        readonly maxBufferedBytes: number;
        readonly preHandshakeMaxBytes: number;
        /** How often the server pings. 0 means the heartbeat is off. */
        readonly heartbeatMs: number;
    };
    /**
     * State the first screen needs, so a client renders something before its first RPC.
     *
     * Only what the server already holds in memory at handshake time. Anything that would need a
     * store read belongs in an RPC, because a handshake that waits on disk is a handshake that hangs.
     */
    readonly snapshot: {
        readonly agents: readonly AgentDefinition[];
        readonly uptimeMs: number;
    };
}
/** The payload of a {@link GATEWAY_EVENTS.JobsChanged} or {@link GATEWAY_EVENTS.AgentsChanged}. */
export interface ChangedData {
    /** What happened, so a client can decide whether a full re-read is worth it. */
    readonly change: 'added' | 'removed' | 'defined';
    /** The record's id. */
    readonly id: string;
}
/**
 * The payload of a {@link GATEWAY_EVENTS.TurnEvent} event.
 *
 * `sessionId` is what makes fan-out usable rather than merely possible. A mirroring client watches
 * several conversations at once, and a frame carrying only a `streamId` — an id chosen by the OTHER
 * client, which this one has never seen — cannot be filed against a conversation. Absent when the
 * run named no conversation, in which case the run belongs to its originator alone and is never
 * fanned out.
 */
/** What one turn is asked for, when the client wants its events streamed. */
export interface StreamParams extends AskParams {
    /**
     * The stream's id, chosen by the CLIENT.
     *
     * Deliberate: the accept response and the first events can arrive in the same TCP segment, so a
     * client that waited for a server-assigned id would already have dropped events by the time it
     * had somewhere to put them. Letting the client name the stream removes the race entirely.
     */
    readonly streamId?: string;
}
/** A correction for the server-minted active run, not a follow-up turn. */
export interface SteerParams {
    readonly runId: string;
    readonly message: string;
    readonly images?: readonly SteeringImage[];
}
/** The acknowledgement of a streaming run. */
export interface StreamAccepted {
    /** Original saved input identity, assigned by the authorized gateway. */
    readonly inputId?: string;
    /** Resolved durable conversation identity, including a newly allocated chat. */
    readonly sessionKey?: string;
    readonly streamId: string;
    /**
     * The SERVER's name for the run, which is the one `tasks.*` uses.
     *
     * Distinct from `streamId` because the stream id is chosen by the client — deliberately, so the
     * accept response cannot race the first events — and two clients therefore pick the same one
     * routinely. A `tasks.cancel` keyed on the client's id would abort somebody else's run by
     * coincidence; keyed on this one it cannot.
     */
    readonly runId: string;
}
/** Liveness and identity. */
export interface HealthResult {
    readonly ok: true;
    readonly version: string;
    readonly protocol: number;
    readonly uptimeMs: number;
    readonly connections: number;
}
/** A filter over sessions. */
export interface SessionListParams {
    readonly agentId?: string;
    readonly userId?: string;
    readonly limit?: number;
}
/** Names one record. */
export interface IdParams {
    readonly id: string;
}
/** Registers or replaces an agent. */
export interface AgentDefineParams {
    readonly agent: AgentDefinition;
}
/**
 * A scheduled job, in the two shapes an operator actually creates.
 *
 * Narrower than the scheduler's own `JobTrigger`/`JobAction` unions on purpose: the wire is a
 * public surface and every shape on it has to be validated, versioned and documented forever. A
 * scheduled prompt and a scheduled command are what a TUI or an IDE asks for; the full union stays
 * internal and reachable through the scheduler API.
 */
export interface JobAddParams {
    readonly name: string;
    /** A cron expression. Exactly one of `cron`, `intervalMs` and `at` must be given. */
    readonly cron?: string;
    readonly timezone?: string;
    readonly intervalMs?: number;
    readonly at?: number;
    /** An agent turn to run. Exactly one of `prompt` and `command` must be given. */
    readonly prompt?: string;
    readonly agentId?: string;
    /**
     * Where the answer goes, as `channel:conversation` — `telegram:12345`.
     *
     * Absent leaves the answer in the run record, which is what a job that exists to do something
     * rather than to say something wants. A reminder wants the opposite.
     */
    readonly deliverTo?: string;
    /** Say nothing when the turn produced nothing. A quiet night should be quiet. */
    readonly silentWhenEmpty?: boolean;
    /** A shell command to run. */
    readonly command?: string;
    readonly enabled?: boolean;
}
/** A spend query. */
export interface CreditSummaryParams {
    readonly scope?: CreditScope;
    readonly scopeId?: string;
    readonly from?: number;
    readonly to?: number;
}
/** The answer to a method that only reports success. */
export interface OkResult {
    readonly ok: true;
}
/** Names one session, for the subscription methods. */
export interface SessionRef {
    readonly sessionId: string;
}
/**
 * One streaming run, as an operator or a second client sees it.
 *
 * Reported from the gateway's own registry rather than from the agent, because the gateway is the
 * only place that knows which CONNECTION owns a run — and "cancel the run my phone started from my
 * laptop" is the reason this family exists at all.
 */
export interface TaskRecord {
    /**
     * The id `tasks.cancel` takes, and the reason this is not `streamId`.
     *
     * A listing whose entries could not be acted on would be a screen with a Cancel button that has
     * nothing to send: the stream id is the CLIENT's name for the run, two clients pick the same one
     * routinely, and a cancel keyed on it would abort somebody else's turn by coincidence.
     */
    readonly runId: string;
    readonly streamId: string;
    readonly principalId: string;
    /** The connection that started it. Two clients of one principal are distinguishable. */
    readonly connectionId: string;
    readonly sessionId: string | null;
    readonly agentId: string | null;
    readonly startedAt: number;
    readonly cancelling: boolean;
}
/** One channel account the deployment is running. */
export interface ChannelInfo {
    readonly id: string;
    readonly name: string;
    /** The message actions the platform's adapter actually implements. */
    readonly actions: readonly string[];
}
/** A channel's live health, as its own adapter reports it. */
export interface ChannelStatusResult {
    readonly id: string;
    readonly lifecycle: 'starting' | 'ready' | 'recovering' | 'blocked' | 'stopped' | 'unknown';
    readonly connected: boolean;
    readonly configured: boolean;
    readonly lastError?: string;
    readonly issues: readonly {
        readonly kind: string;
        readonly message: string;
    }[];
}
/** What `workspaces.create` is asked for. Narrower than `CreateWorkspaceInput` — see the handler. */
/** Bounded owned-workspace discovery never enumerates the entire registry on the wire. */
export interface WorkspacePageParams {
    readonly includePresence?: boolean;
    readonly limit?: number;
    readonly cursor?: string;
}
/** Creates a named workspace, optionally expiring after `ttlMs`. */
export interface WorkspaceCreateParams {
    readonly name: string;
    readonly ttlMs?: number;
    readonly tags?: readonly string[];
}
/** What `workspaces.destroy` is asked for. */
export interface WorkspaceDestroyParams {
    readonly id: string;
    /** Overrides live leases. Recorded in the audit trail with the runs it overrode. */
    readonly force?: boolean;
}
/** A paired device, without the credential. */
export interface DeviceInfo {
    readonly deviceId: string;
    readonly name: string;
    readonly scopes: readonly Scope[];
    readonly approvedAt: number;
    readonly principalId?: string;
}
/** A device waiting for an operator, as it appears on the wire. */
export interface DeviceRequestInfo {
    readonly requestId: string;
    readonly deviceId: string;
    readonly name: string;
    readonly requestedScopes: readonly Scope[];
    readonly remoteAddress: string;
    readonly createdAt: number;
    readonly expiresAt: number;
}
/**
 * The device roster: what is paired and what is asking to be.
 *
 * One method for both halves because they are one screen and one decision — an operator looking at
 * a pending request needs to see whether that device is already paired under another name, and two
 * round trips to find out is two chances for the two lists to be read from different moments.
 */
export interface DeviceListResult {
    readonly approved: readonly DeviceInfo[];
    readonly pending: readonly DeviceRequestInfo[];
}
/** Approving a device, optionally overriding the scopes it asked for. */
export interface DeviceApproveParams {
    readonly requestId: string;
    /**
     * Absent grants exactly what the device requested. A list here REPLACES that, and may widen it.
     *
     * Stated plainly because the previous wording ("may only NARROW it") was false of every
     * implementation: `MemoryPairingStore.approve` does `grant(..., scopes ?? requestedScopes)` and
     * never compares the two. Widening is the intended behaviour and not an oversight — a device
     * that sends no `x-nexa-scopes` header is recorded as requesting `read`, which is every client
     * that has not been told otherwise, so a narrow-only rule would make it impossible to pair your
     * own laptop as an admin without first re-pairing it with a hand-set header.
     *
     * It is not a privilege escalation BY the device: `devices.approve` requires `admin`, so the
     * only party that can widen a grant is one that already holds everything it is granting.
     */
    readonly scopes?: readonly Scope[];
}
/** Names a device. */
export interface DeviceRefParams {
    readonly deviceId: string;
}
/** What `devices.approve` hands back. The token is plaintext exactly once. */
export interface DeviceApproveResult {
    readonly device: DeviceInfo;
    readonly token: string;
}
/** One approval waiting for a human. */
export interface PendingApproval extends ApprovalRequestedData {
    readonly runId: string | null;
}
/** An operator's answer to one approval. */
export interface ApprovalResolveParams {
    readonly approvalId: string;
    readonly approved: boolean;
    readonly reason?: string;
}
/** One log line. */
export interface LogRecord {
    readonly at: number;
    readonly level: LogLevel;
    readonly scope: string;
    readonly message: string;
    readonly fields: LogFields;
}
/** A window over the recent log. */
export interface LogTailParams {
    /** How many lines back to read. Absent reads everything the buffer still holds. */
    readonly limit?: number;
    /** Only lines at or above this level. */
    readonly level?: LogLevel;
    /** Only lines from this subsystem, e.g. `gateway`. */
    readonly scope?: string;
    /** Only lines newer than this timestamp, so a poller does not re-read what it has. */
    readonly since?: number;
}
/** The effective configuration, with secrets removed. */
export interface ConfigResult {
    /** The merged config as JSON. Redacted — see `redactConfig` in the server. */
    readonly config: Readonly<Record<string, JsonValue>>;
    /** The file it was loaded from, or null when everything came from defaults and the env. */
    readonly path: string | null;
    /** Field paths whose values were replaced by a placeholder, so a UI can say so. */
    readonly redacted: readonly string[];
    /**
     * The configuration as it would be with no file and no environment at all.
     *
     * Sent so a UI can offer a settings EDITOR rather than a settings viewer. Three things need it
     * and none can be derived from the merged config alone: the type of a key the operator has not
     * set yet (an absent key has no value to infer one from), whether the current value differs from
     * the shipped one, and what "reset" would restore. Without it a console can only show what is
     * set, which is precisely the half an operator already knows.
     */
    readonly defaults: Readonly<Record<string, JsonValue>>;
}
/** Every method, with its params and its result. The single source of truth for both ends. */
/** Client attachment handler outcome; receipt does not assert that a human viewed it. */
export interface MediaAcknowledgeParams {
    readonly id: string;
    readonly received: boolean;
}
/** Identifies a saved file within an owned session. */
export interface SessionFileParams {
    readonly id: string;
    readonly attachmentId: string;
}
/** Independent inference accepts caller input and returns a validated JSON document. */
/** A spending limit for one credit scope; the limit is integer micro-cents, never a floating-point amount. */
export interface BudgetSetParams {
    readonly scope: CreditScope;
    readonly scopeId: string;
    readonly limitMicrocents: number;
    readonly period: BudgetPeriod;
    readonly enforcement: BudgetEnforcement;
    readonly id?: string;
}
/** The stateless `decision.run` method. */
export interface DecisionRunMethod {
    readonly params: DecisionRunParams;
    readonly result: DecisionRunResult;
}
/** Every gateway method with its params and result; the method name is the key. */
export interface GatewayMethods {
    readonly 'redteam.start': RedTeamStartMethod;
    readonly 'redteam.list': RedTeamListMethod;
    readonly 'redteam.get': RedTeamGetMethod;
    readonly 'redteam.stop': RedTeamStopMethod;
    readonly 'redteam.update': RedTeamUpdateMethod;
    /** List customer server registrations for the authenticated account. */
    readonly 'connectors.list': ConnectorListMethod;
    /** Read an account-owned page of signed hardware metadata and lease-derived presence. */
    readonly 'connectors.inventory': ConnectorInventoryMethod;
    /** Compare current account-owned connector prompt facts without transferring inventory. */
    readonly 'connectors.context.check': ConnectorContextCheckMethod;
    /** Read account-owned instructions attached to one linked connector. */
    readonly 'connectors.instructions.get': ConnectorInstructionsGetMethod;
    /** Replace connector instructions using the user's observed edit revision. */
    readonly 'connectors.instructions.update': ConnectorInstructionsUpdateMethod;
    /** Read a paired computer's separately approved full-host capabilities. */
    readonly 'connectors.host.status': ConnectorHostStatusMethod;
    /** Admit an exact original operation under the current full-host grant. */
    readonly 'connectors.host.submit': ConnectorHostSubmitMethod;
    /** Poll the same immutable host job without resubmitting an effect. */
    readonly 'connectors.host.result': ConnectorHostResultMethod;
    /** Reads verified mapping choices through the account-owned Nexa gateway. */
    readonly 'connectors.workspace.catalog': ConnectorWorkspaceCatalogMethod;
    /** Selects an exact Joint mapping for subsequent turns without granting programs. */
    readonly 'connectors.workspace.select-joint': ConnectorWorkspaceSelectJointMethod;
    /** Select a separately approved full-computer grant for subsequent conversation turns. */
    readonly 'connectors.workspace.select-host': ConnectorWorkspaceSelectHostMethod;
    /** Read one owned conversation's selected customer workspace and checked revision. */
    readonly 'connectors.workspace.get': ConnectorWorkspaceGetMethod;
    /** Read the authenticated account's main workspace preference. */
    readonly 'connectors.workspace.preference.get': WorkspacePreferenceGetMethod;
    /** Save the authenticated account's main workspace preference for future turns. */
    readonly 'connectors.workspace.preference.set': WorkspacePreferenceSetMethod;
    /** Select an exact current customer root and grant for one owned conversation. */
    readonly 'connectors.workspace.select': ConnectorWorkspaceSelectMethod;
    /** Clear only the selection matching the original checked revision. */
    readonly 'connectors.workspace.clear': ConnectorWorkspaceClearMethod;
    /** Create one empty owned conversation under a retained original request without starting managed compute. */
    readonly 'connectors.workspace.create': ConnectorWorkspaceCreateMethod;
    /** Review the identity behind an entered device code under the authenticated account. */
    readonly 'connectors.link.review': ConnectorLinkReviewMethod;
    /** Explicitly approve the exact reviewed device without granting execution permission. */
    readonly 'connectors.link.approve': ConnectorLinkApproveMethod;
    /** Reject the exact pending reviewed device without enrolling or revoking an environment. */
    readonly 'connectors.link.deny': ConnectorLinkDenyMethod;
    /** Read only account-owned enrollment metadata. */
    readonly 'connectors.get': ConnectorGetMethod;
    /** Permanently revoke an enrolled customer server. */
    readonly 'connectors.revoke': ConnectorRevokeMethod;
    /** Discover signed current root aliases and exact counters. */
    readonly 'connectors.filesystem': ConnectorFilesystemMethod;
    /** Admit one original bounded file operation under its exact observed sequence. */
    readonly 'connectors.files.submit': ConnectorSubmitMethod;
    /** Read an original retained result under exact account/environment authority. */
    readonly 'connectors.files.get': ConnectorResultMethod;
    /** Read signed local execution grants and permanent lane watermarks. */
    readonly 'connectors.execution': ConnectorExecutionMethod;
    /** Admit an exact original command with independent workspace write intent. */
    readonly 'connectors.execution.submit': ConnectorExecuteMethod;
    /** Read retained output without admitting work or inferring completion. */
    readonly 'connectors.execution.output': ConnectorExecutionOutputMethod;
    /** Read one original command result without admitting another effect. */
    readonly 'connectors.execution.get': ConnectorExecutionResultMethod;
    /** Request a signed stop for one captured original without reading its command output. */
    readonly 'connectors.execution.cancel': ConnectorExecutionStopMethod;
    /** Read exact latest original metadata in the two permanent command lanes. */
    readonly 'connectors.execution.jobs': ConnectorExecutionCurrentJobsMethod;
    /** Account-level sign-in state of every subscription application on the user's VM. */
    readonly 'connections.applications.check': ConnectionApplicationsCheckMethod;
    /** Open an application's own login in a terminal on the user's VM. */
    readonly 'connections.applications.setup': ConnectionApplicationsSetupMethod;
    /** Read install state of the user's licensed tools on their VM. */
    readonly 'connections.tools.status': ConnectionToolsStatusMethod;
    /** Install a licensed tool on the user's VM with the user's own linked license. */
    readonly 'connections.tools.install': ConnectionToolsInstallMethod;
    /** Remove a licensed tool, and its license file, from the user's VM. */
    readonly 'connections.tools.remove': ConnectionToolsRemoveMethod;
    /** List chat models the user connected with their own key or subscription. */
    readonly 'connections.models.list': ConnectionModelsListMethod;
    /** Wake an existing VM without creating a first-time environment. */
    readonly 'environment.visit': EnvironmentVisitMethod;
    /** Prepare only the authenticated account's assigned remote environment. */
    readonly 'environment.prepare': EnvironmentPrepareMethod;
    /** Resume bounded controller-authored setup progress from any Nexa replica. */
    readonly 'environment.status': EnvironmentStatusMethod;
    /** Read cached actual resource usage for the authenticated account without starting its VM. */
    readonly 'environment.usage': VmUsageMethod;
    /** Explicit operators inspect cached usage only when this deployment advertises VM administration. */
    readonly 'environment.admin.usage': VmUsageAdministrativeMethod;
    /** Full-network totals and bounded cached VM metrics require the current platform administrator role. */
    readonly 'environment.admin.network': VmUsageNetworkMethod;
    /** Paged enrolled host observations require the current platform administrator role. */
    readonly 'environment.admin.fleet': VmFleetMethod;
    /** Platform operators inspect one account's managed VM through Nexa's protected Compute adapter. */
    readonly 'environment.admin.inspect': VmAdministrationInspectMethod;
    readonly 'environment.admin.operation': VmAdministrationOperationMethod;
    /** Exact observed generations and stable request IDs protect administrative lifecycle operations. */
    readonly 'environment.admin.mutate': VmAdministrationMutateMethod;
    /** Private emotional state toward the authenticated caller; no user selector is accepted. */
    readonly 'self.emotions': EmotionalReadMethod;
    readonly 'design.create': DesignCreateMethod;
    readonly 'design.duplicate': DesignDuplicateMethod;
    readonly 'design.import': DesignImportMethod;
    readonly 'design.delete': DesignDeleteMethod;
    readonly 'design.save': DesignSaveMethod;
    readonly 'design.arrange': DesignArrangeMethod;
    readonly 'design.component': DesignComponentMethod;
    readonly 'design.transfer': DesignTransferMethod;
    readonly 'design.clipboard.copy': DesignClipboardCopyMethod;
    readonly 'design.clipboard.cut': DesignClipboardCutMethod;
    readonly 'design.clipboard.paste': DesignClipboardPasteMethod;
    readonly 'design.svg.import': DesignSvgImportMethod;
    readonly 'design.undo': DesignUndoMethod;
    readonly 'design.read': DesignReadMethod;
    readonly 'design.comments': DesignCommentsMethod;
    readonly 'design.comment.text': DesignCommentTextMethod;
    readonly 'design.view': DesignViewMethod;
    readonly 'design.text.window': DesignTextWindowMethod;
    readonly 'design.canvas': DesignCanvasMethod;
    readonly 'design.pattern.tile': DesignPatternTileMethod;
    readonly 'design.layout.preview': DesignLayoutPreviewMethod;
    readonly 'design.canvas.metrics': DesignCanvasMetricsMethod;
    readonly 'design.list': DesignListMethod;
    readonly 'design.events': DesignEventsMethod;
    readonly 'design.changes': DesignChangesMethod;
    readonly 'design.layout': DesignLayoutMethod;
    readonly 'design.colors': DesignColorReadMethod;
    readonly 'design.asset.start': DesignAssetStartMethod;
    readonly 'design.asset.chunk': DesignAssetChunkMethod;
    readonly 'design.asset.finish': DesignAssetFinishMethod;
    readonly 'design.asset.cancel': DesignAssetCancelMethod;
    readonly 'design.asset.read': DesignAssetReadMethod;
    readonly 'design.font.list': DesignFontListMethod;
    readonly 'design.font.read': DesignFontReadMethod;
    readonly 'design.asset.list': DesignAssetListMethod;
    readonly 'design.asset.remove': DesignAssetRemoveMethod;
    readonly 'workflows.schedules.preview': {
        readonly params: WorkflowSchedulePreview;
        readonly result: readonly string[];
    };
    readonly 'workflows.schedules.read': {
        readonly params: WorkflowScheduleRead;
        readonly result: WorkflowScheduleView | null;
    };
    readonly 'workflows.schedules.enable': {
        readonly params: WorkflowScheduleEnable;
        readonly result: WorkflowScheduleView;
    };
    readonly 'workflows.schedules.disable': {
        readonly params: WorkflowScheduleCommand;
        readonly result: WorkflowScheduleView;
    };
    readonly 'workflows.publications.check': {
        readonly params: WorkflowPublicationCheckRequest;
        readonly result: WorkflowPublicationCheck;
    };
    readonly 'workflows.publications.publish': {
        readonly params: WorkflowPublishRequest;
        readonly result: WorkflowPublishResult;
    };
    readonly 'workflows.publications.read': {
        readonly params: WorkflowPublicationReadRequest;
        readonly result: WorkflowPublication | null;
    };
    readonly 'workflows.publications.list': {
        readonly params: WorkflowPublicationListRequest;
        readonly result: WorkflowPublicationPage;
    };
    readonly 'workflows.publications.run': {
        readonly params: WorkflowPublishedRunRequest;
        readonly result: WorkflowRunSummary;
    };
    readonly 'workflows.attention.list': {
        readonly params: WorkflowAttentionQuery;
        readonly result: WorkflowAttentionPage;
    };
    readonly 'workflows.runs.questions': {
        readonly params: WorkflowRunRequest;
        readonly result: WorkflowHumanPage;
    };
    readonly 'workflows.runs.question.read': {
        readonly params: WorkflowHumanIdentity;
        readonly result: WorkflowHumanRequest;
    };
    readonly 'workflows.runs.approval.decide': {
        readonly params: WorkflowApprovalDecision;
        readonly result: WorkflowHumanRequest;
    };
    readonly 'workflows.runs.question.answer': {
        readonly params: WorkflowHumanAnswer;
        readonly result: WorkflowHumanRequest;
    };
    readonly 'workflows.runs.artifacts': {
        readonly params: WorkflowArtifactListRequest;
        readonly result: WorkflowArtifactListPage;
    };
    readonly 'workflows.runs.artifact': {
        readonly params: WorkflowRunArtifactRequest;
        readonly result: WorkflowRunArtifactPage;
    };
    readonly 'workflows.runs.terminal.read': {
        readonly params: WorkflowTerminalRequest;
        readonly result: WorkflowTerminalSnapshot;
    };
    readonly 'workflows.runs.terminal.command': {
        readonly params: WorkflowTerminalCommand;
        readonly result: WorkflowTerminalSnapshot;
    };
    readonly 'workflows.runs.start': {
        readonly params: WorkflowRunStartRequest;
        readonly result: WorkflowRunSummary;
    };
    readonly 'workflows.runs.usageBreakdown': {
        readonly params: WorkflowRunBreakdownRequest;
        readonly result: WorkflowRunBreakdownView;
    };
    readonly 'workflows.runs.usage': {
        readonly params: WorkflowRunUsageRequest;
        readonly result: WorkflowRunUsageView;
    };
    readonly 'workflows.runs.loopSpending': {
        readonly params: WorkflowLoopSpendingRequest;
        readonly result: WorkflowLoopSpendingView;
    };
    readonly 'workflows.runs.loopPricing': {
        readonly params: WorkflowLoopSpendingRequest;
        readonly result: WorkflowLoopSpendingView;
    };
    readonly 'workflows.runs.read': {
        readonly params: WorkflowRunRequest;
        readonly result: WorkflowRunSummary;
    };
    readonly 'workflows.runs.agent.read': {
        readonly params: WorkflowAgentSessionRequest;
        readonly result: WorkflowAgentSession;
    };
    readonly 'workflows.runs.agent.control': {
        readonly params: WorkflowAgentControlRequest;
        readonly result: WorkflowAgentSession;
    };
    readonly 'workflows.runs.agent.input': {
        readonly params: WorkflowAgentInputRequest;
        readonly result: WorkflowAgentSession;
    };
    readonly 'workflows.runs.cancel': {
        readonly params: WorkflowRunRequest;
        readonly result: WorkflowRunSummary;
    };
    readonly 'workflows.runs.events': {
        readonly params: WorkflowRunEventsRequest;
        readonly result: readonly WorkflowRunEvent[];
    };
    readonly 'workflows.runs.steps': {
        readonly params: WorkflowRunStepsRequest;
        readonly result: WorkflowRunStepsPage;
    };
    readonly 'workflows.runs.output': {
        readonly params: WorkflowRunOutputRequest;
        readonly result: WorkflowRunOutputPage;
    };
    readonly 'workflows.runs.attempts': {
        readonly params: WorkflowRunAttemptsRequest;
        readonly result: WorkflowRunAttemptsPage;
    };
    readonly 'workflows.runs.inputs': {
        readonly params: WorkflowRunOutputRequest;
        readonly result: WorkflowRunOutputPage | null;
    };
    readonly 'workflows.runs.list': {
        readonly params: WorkflowRunListRequest;
        readonly result: WorkflowRunListPage;
    };
    readonly 'workflows.planning.sources': {
        readonly params: PlanningSourcesRequest;
        readonly result: PlanningSourcesPage;
    };
    readonly 'workflows.planning.send': {
        readonly params: PlanningRequest;
        readonly result: PlanningTurn;
    };
    readonly 'workflows.planning.read': {
        readonly params: PlanningTurnRef;
        readonly result: PlanningTurn;
    };
    readonly 'workflows.planning.cancel': {
        readonly params: PlanningTurnRef;
        readonly result: PlanningTurn;
    };
    readonly 'workflows.planning.history': {
        readonly params: PlanningHistoryRequest;
        readonly result: PlanningHistory;
    };
    readonly 'workflows.models.image.resolve': {
        readonly params: WorkflowImageResolutionRequest;
        readonly result: WorkflowImageResolution;
    };
    readonly 'workflows.models.image.quote': {
        readonly params: WorkflowImageQuoteRequest;
        readonly result: WorkflowImageQuote;
    };
    readonly 'workflows.models.resolve': {
        readonly params: WorkflowModelResolutionRequest;
        readonly result: WorkflowModelResolution;
    };
    readonly 'workflows.models.refresh': {
        readonly params: WorkflowModelsRequest;
        readonly result: WorkflowModelsPage;
    };
    readonly 'workflows.models': {
        readonly params: WorkflowModelsRequest;
        readonly result: WorkflowModelsPage;
    };
    readonly 'workflows.catalog': {
        readonly params: Record<string, never>;
        readonly result: WorkflowCatalog;
    };
    readonly 'workflows.validate': {
        readonly params: WorkflowValidateRequest;
        readonly result: GraphValidation;
    };
    readonly 'workflows.create': {
        readonly params: WorkflowCreateRequest;
        readonly result: WorkflowReceipt;
    };
    readonly 'workflows.save': {
        readonly params: WorkflowSaveRequest;
        readonly result: WorkflowReceipt;
    };
    readonly 'workflows.delete': {
        readonly params: WorkflowDeleteRequest;
        readonly result: WorkflowDeleteReceipt;
    };
    readonly 'workflows.list': {
        readonly params: WorkflowListRequest;
        readonly result: WorkflowListPage;
    };
    readonly 'workflows.read': {
        readonly params: WorkflowReadRequest;
        readonly result: WorkflowManifestPage;
    };
    readonly 'workflows.record': {
        readonly params: WorkflowRecordRequest;
        readonly result: WorkflowRecordPage;
    };
    readonly 'workflows.records': {
        readonly params: WorkflowRecordsRequest;
        readonly result: WorkflowRecordsPage;
    };
    readonly 'processes.list': {
        readonly params: SessionRef;
        readonly result: readonly BackgroundProcess[];
    };
    readonly 'processes.log': {
        readonly params: ProcessLogRef;
        readonly result: BackgroundProcessLog;
    };
    readonly 'processes.stop': {
        readonly params: BackgroundProcessRef;
        readonly result: OkResult;
    };
    readonly 'processes.input': {
        readonly params: ProcessInput;
        readonly result: OkResult;
    };
    readonly 'processes.resize': {
        readonly params: ProcessResize;
        readonly result: OkResult;
    };
    readonly 'data.upload.create': {
        readonly params: DataUploadCreateParams;
        readonly result: DataUploadTarget;
    };
    readonly 'data.upload.target': {
        readonly params: DataUploadTargetParams;
        readonly result: DataUploadTarget;
    };
    readonly 'data.upload.select': {
        readonly params: DataUploadSelectParams;
        readonly result: DataUploadSelectionResult;
    };
    readonly 'data.upload.start': {
        readonly params: DataUploadStartParams;
        readonly result: ConversationDataUpload;
    };
    readonly 'data.upload.chunk': {
        readonly params: DataUploadChunkParams;
        readonly result: DataUploadPosition;
    };
    readonly 'data.upload.finish': {
        readonly params: DataUploadIdParams;
        readonly result: ConversationDataFile;
    };
    readonly 'data.upload.cancel': {
        readonly params: DataUploadIdParams;
        readonly result: OkResult;
    };
    readonly 'luau.editor.start': {
        readonly params: LuauEditorHandle;
        readonly result: LuauEditorAck;
    };
    readonly 'luau.editor.stage': {
        readonly params: LuauEditorSourcePart;
        readonly result: LuauEditorAck;
    };
    readonly 'luau.editor.commit': {
        readonly params: LuauEditorCommit;
        readonly result: LuauEditorReport;
    };
    readonly 'luau.editor.hover': {
        readonly params: LuauEditorQuery;
        readonly result: LuauEditorHover;
    };
    readonly 'luau.editor.completion': {
        readonly params: LuauEditorQuery;
        readonly result: LuauEditorCompletion;
    };
    readonly 'luau.editor.definition': {
        readonly params: LuauEditorQuery;
        readonly result: LuauEditorDefinition;
    };
    readonly 'luau.editor.close': {
        readonly params: LuauEditorHandle;
        readonly result: LuauEditorAck;
    };
    readonly 'roblox.live.start': {
        readonly params: RobloxLiveStartRequest;
        readonly result: RobloxLiveFrame;
    };
    readonly 'roblox.live.step': {
        readonly params: RobloxLiveStepRequest;
        readonly result: RobloxLiveFrame;
    };
    readonly 'roblox.live.export': {
        readonly params: RobloxLiveHandleRequest;
        readonly result: RobloxLiveExport;
    };
    readonly 'roblox.live.close': {
        readonly params: RobloxLiveHandleRequest;
        readonly result: RobloxLiveClosed;
    };
    readonly 'roblox.credentials.status': {
        readonly params: Record<string, never>;
        readonly result: RobloxCredentialStatus;
    };
    readonly 'roblox.credentials.set': {
        readonly params: RobloxCredentialSetParams;
        readonly result: RobloxCredentialStatus;
    };
    readonly 'roblox.credentials.remove': {
        readonly params: Record<string, never>;
        readonly result: RobloxCredentialStatus;
    };
    readonly 'roblox.telemetry.projects': {
        readonly params: Record<string, never>;
        readonly result: readonly TelemetryProject[];
    };
    readonly 'roblox.telemetry.funnel': {
        readonly params: TelemetryFunnelParams;
        readonly result: FunnelReport;
    };
    readonly 'roblox.telemetry.performance': {
        readonly params: TelemetryPerformanceParams;
        readonly result: PerformanceReport;
    };
    readonly 'reverse.browser.structure': {
        readonly params: BrowserStructureQuery;
        readonly result: BrowserStructurePage;
    };
    readonly 'reverse.browser.screenshot': {
        readonly params: BrowserScreenshotQuery;
        readonly result: BrowserScreenshotPage;
    };
    readonly 'reverse.browser.storage': {
        readonly params: BrowserStorageQuery;
        readonly result: BrowserStoragePage;
    };
    readonly 'reverse.browser.webmcp': {
        readonly params: BrowserWebMcpQuery;
        readonly result: BrowserWebMcpPage;
    };
    readonly 'reverse.browser.storage.comparison': {
        readonly params: BrowserStorageComparisonQuery;
        readonly result: BrowserStorageComparisonPage;
    };
    readonly 'reverse.browser.sources': {
        readonly params: BrowserSourcesQuery;
        readonly result: BrowserSourcesPage;
    };
    readonly 'reverse.browser.modules': {
        readonly params: BrowserModuleQuery;
        readonly result: BrowserModulePage;
    };
    readonly 'reverse.browser': {
        readonly params: ReverseBrowserQuery;
        readonly result: ReverseBrowserPage;
    };
    readonly 'reverse.network.detail': {
        readonly params: ReverseNetworkDetailQuery;
        readonly result: ReverseNetworkDetailPage;
    };
    readonly 'reverse.network': {
        readonly params: ReverseNetworkDirectoryQuery;
        readonly result: ReverseNetworkDirectoryPage;
    };
    readonly 'reverse.functions': {
        readonly params: ReverseFunctionsQuery;
        readonly result: ReverseFunctionsPage;
    };
    readonly 'reverse.inspect': {
        readonly params: ReverseInspectQuery;
        readonly result: ReverseInspectResult;
    };
    readonly 'reverse.catalog': {
        readonly params: ReverseCatalogQuery;
        readonly result: ReverseCatalogPage;
    };
    readonly 'reverse.graph': {
        readonly params: ReverseGraphQuery;
        readonly result: ReverseGraphPage;
    };
    readonly 'reverse.evidence': {
        readonly params: ReverseEvidenceQuery;
        readonly result: ReverseEvidencePage;
    };
    /** Confined managed workspace browser operation. */
    readonly 'workspace.files.list': {
        readonly params: BrowserFilesListParams;
        readonly result: BrowserFilesPage;
    };
    /** Confined managed workspace browser operation. */
    readonly 'workspace.files.read': {
        readonly params: BrowserFilesReadParams;
        readonly result: BrowserFilesRead;
    };
    /** Confined managed workspace browser operation. */
    readonly 'workspace.files.start': {
        readonly params: BrowserFilesStartParams;
        readonly result: BrowserFilesUpload;
    };
    /** Confined managed workspace browser operation. */
    readonly 'workspace.files.chunk': {
        readonly params: BrowserFilesChunkParams;
        readonly result: BrowserFilesPosition;
    };
    /** Confined managed workspace browser operation. */
    readonly 'workspace.files.finish': {
        readonly params: BrowserFilesUploadParams;
        readonly result: BrowserFilesDone;
    };
    /** Confined managed workspace browser operation. */
    readonly 'workspace.files.cancel': {
        readonly params: BrowserFilesUploadParams;
        readonly result: BrowserFilesDone;
    };
    /** Confined managed workspace browser operation. */
    readonly 'workspace.files.mkdir': {
        readonly params: BrowserFilesTarget;
        readonly result: BrowserFilesDone;
    };
    /** Confined, non-overwriting sibling rename. */
    readonly 'workspace.files.rename': {
        readonly params: BrowserFilesRenameParams;
        readonly result: BrowserFilesDone;
    };
    /** Confined removal of a user file or directory. */
    readonly 'workspace.files.remove': {
        readonly params: BrowserFilesTarget;
        readonly result: BrowserFilesDone;
    };
    readonly 'sessions.files': {
        readonly params: SessionFileListParams;
        readonly result: SessionFilePage;
    };
    readonly 'sessions.planning': {
        readonly params: SessionRef;
        readonly result: AgileView;
    };
    readonly 'sessions.sprint': {
        readonly params: AgileSessionCommand;
        readonly result: AgileView;
    };
    readonly 'sessions.download': {
        readonly params: SessionFileParams;
        readonly result: OkResult;
    };
    readonly 'media.acknowledge': {
        readonly params: MediaAcknowledgeParams;
        readonly result: OkResult;
    };
    readonly connect: {
        readonly params: ConnectParams;
        readonly result: HelloOk;
    };
    readonly health: {
        readonly params: Record<string, never>;
        readonly result: HealthResult;
    };
    readonly 'agent.ask': {
        readonly params: AskParams;
        readonly result: AskResult;
    };
    readonly 'agent.steer': {
        readonly params: SteerParams;
        readonly result: {
            readonly accepted: boolean;
        };
    };
    readonly 'agent.stream': {
        readonly params: StreamParams;
        readonly result: StreamAccepted;
    };
    readonly 'voice.start': {
        readonly params: VoiceStartParams;
        readonly result: VoiceStarted;
    };
    readonly 'voice.audio': {
        readonly params: VoiceAudioParams;
        readonly result: OkResult;
    };
    readonly 'voice.stop': {
        readonly params: VoiceStopParams;
        readonly result: OkResult;
    };
    readonly 'sessions.list': {
        readonly params: SessionListParams;
        readonly result: readonly Session[];
    };
    readonly 'sessions.get': {
        readonly params: IdParams;
        readonly result: Session | null;
    };
    readonly 'sessions.messages': {
        readonly params: IdParams;
        readonly result: readonly ModelMessage[];
    };
    /** Compact transcript blocks with original journal byte cursors. */
    readonly 'sessions.transcript': {
        readonly params: SessionHistoryParams;
        readonly result: SessionHistoryPage;
    };
    readonly 'sessions.delete': {
        readonly params: IdParams;
        readonly result: OkResult;
    };
    readonly 'sessions.rename': {
        readonly params: ConversationRenameParams;
        readonly result: Session;
    };
    readonly 'sessions.input': {
        readonly params: ConversationPinParams;
        readonly result: ConversationInput;
    };
    readonly 'sessions.retry': {
        readonly params: ConversationRetryParams;
        readonly result: ConversationRetryResult;
    };
    /**
     * Every saved version of an owned conversation, the conversation itself included, oldest first.
     * An edit or regeneration starts a version; together they are one conversation with branches.
     */
    readonly 'sessions.versions': {
        readonly params: IdParams;
        readonly result: readonly Session[];
    };
    readonly 'sessions.pin': {
        readonly params: ConversationPinParams;
        readonly result: ConversationPin;
    };
    readonly 'sessions.pins': {
        readonly params: ConversationPinsParams;
        readonly result: ConversationPinsPage;
    };
    readonly 'sessions.unpin': {
        readonly params: ConversationUnpinParams;
        readonly result: OkResult;
    };
    readonly 'agents.list': {
        readonly params: Record<string, never>;
        readonly result: readonly AgentDefinition[];
    };
    /** Read the authenticated account's standalone profiles. */
    readonly 'agent.profiles.list': {
        readonly params: Record<string, never>;
        readonly result: AgentProfilesResult;
    };
    /** Create a private custom profile. */
    readonly 'agent.profiles.create': {
        readonly params: AgentProfileCreateParams;
        readonly result: AgentProfilesResult;
    };
    /** Replace editable profile settings at an exact revision. */
    readonly 'agent.profiles.update': {
        readonly params: AgentProfileUpdateParams;
        readonly result: AgentProfilesResult;
    };
    /** Delete one private profile at an exact revision. */
    readonly 'agent.profiles.delete': {
        readonly params: AgentProfileDeleteParams;
        readonly result: AgentProfilesResult;
    };
    /** Explicitly import an earlier private profile library once. */
    readonly 'agent.profiles.upgrade': {
        readonly params: AgentProfileUpgradeParams;
        readonly result: AgentProfilesResult;
    };
    readonly 'agents.define': {
        readonly params: AgentDefineParams;
        readonly result: OkResult;
    };
    readonly 'jobs.list': {
        readonly params: Record<string, never>;
        readonly result: readonly Job[];
    };
    readonly 'jobs.add': {
        readonly params: JobAddParams;
        readonly result: IdParams;
    };
    readonly 'jobs.remove': {
        readonly params: IdParams;
        readonly result: OkResult;
    };
    readonly 'credit.budgets': {
        readonly params: Record<string, never>;
        readonly result: readonly Budget[];
    };
    readonly 'credit.setBudget': {
        readonly params: BudgetSetParams;
        readonly result: Budget;
    };
    readonly 'credit.removeBudget': {
        readonly params: {
            readonly id: string;
        };
        readonly result: {
            readonly ok: true;
        };
    };
    readonly 'credit.resets': {
        readonly params: {
            readonly userId?: string;
        };
        readonly result: ResetSnapshot | null;
    };
    readonly 'credit.resetHistory': {
        readonly params: {
            readonly userId?: string;
            readonly before?: string;
        };
        readonly result: ResetHistoryPage;
    };
    readonly 'credit.resetAllowance': {
        readonly params: ResetAllowanceParams;
        readonly result: ResetAllowanceResult;
    };
    readonly 'credit.wallet': {
        readonly params: {
            readonly userId?: string;
        };
        readonly result: WalletSnapshot | null;
    };
    readonly 'credit.walletHistory': {
        readonly params: {
            readonly userId?: string;
            readonly before?: string;
        };
        readonly result: WalletHistoryPage;
    };
    readonly 'credit.summary': {
        readonly params: CreditSummaryParams;
        readonly result: CreditSummary;
    };
    /**
     * Session fan-out. Explicit rather than implied by scope: a `read` credential holds every
     * session in the install, and a client that received all of them by default would be shipped
     * every keystroke of every other user's conversation to render one.
     */
    readonly 'sessions.subscribe': {
        readonly params: SessionRef;
        readonly result: OkResult;
    };
    readonly 'sessions.unsubscribe': {
        readonly params: SessionRef;
        readonly result: OkResult;
    };
    readonly 'tasks.list': {
        readonly params: Record<string, never>;
        readonly result: readonly TaskRecord[];
    };
    readonly 'tasks.get': {
        readonly params: IdParams;
        readonly result: TaskRecord | null;
    };
    readonly 'tasks.cancel': {
        readonly params: IdParams;
        readonly result: OkResult;
    };
    readonly 'channels.list': {
        readonly params: Record<string, never>;
        readonly result: readonly ChannelInfo[];
    };
    readonly 'channels.status': {
        readonly params: IdParams;
        readonly result: ChannelStatusResult;
    };
    readonly 'channels.deadLetters.list': {
        readonly params: Record<string, never>;
        readonly result: readonly DeadLetter[];
    };
    readonly 'workspaces.visit': {
        readonly params: IdParams;
        readonly result: OkResult;
    };
    readonly 'workspaces.page': {
        readonly params: WorkspacePageParams;
        readonly result: WorkspacePage;
    };
    readonly 'workspaces.list': {
        readonly params: Record<string, never>;
        readonly result: readonly Workspace[];
    };
    readonly 'workspaces.describe': {
        readonly params: IdParams;
        readonly result: WorkspaceDescription;
    };
    readonly 'workspaces.create': {
        readonly params: WorkspaceCreateParams;
        readonly result: Workspace;
    };
    readonly 'workspaces.destroy': {
        readonly params: WorkspaceDestroyParams;
        readonly result: OkResult;
    };
    readonly 'devices.list': {
        readonly params: Record<string, never>;
        readonly result: DeviceListResult;
    };
    readonly 'devices.approve': {
        readonly params: DeviceApproveParams;
        readonly result: DeviceApproveResult;
    };
    readonly 'devices.reject': {
        readonly params: IdParams;
        readonly result: OkResult;
    };
    readonly 'devices.revoke': {
        readonly params: DeviceRefParams;
        readonly result: OkResult;
    };
    readonly 'approvals.list': {
        readonly params: Record<string, never>;
        readonly result: readonly PendingApproval[];
    };
    readonly 'approvals.resolve': {
        readonly params: ApprovalResolveParams;
        readonly result: OkResult;
    };
    readonly 'logs.tail': {
        readonly params: LogTailParams;
        readonly result: readonly LogRecord[];
    };
    readonly 'config.get': {
        readonly params: Record<string, never>;
        readonly result: ConfigResult;
    };
    readonly 'config.set': {
        readonly params: ConfigWriteParams;
        readonly result: ConfigWriteResult;
    };
    readonly 'config.unset': {
        readonly params: {
            readonly key: string;
        };
        readonly result: ConfigWriteResult;
    };
    readonly 'accounts.list': {
        readonly params: Record<string, never>;
        readonly result: readonly AccountSummary[];
    };
    readonly 'accounts.create': {
        readonly params: AccountCreateParams;
        readonly result: AccountSummary;
    };
    readonly 'accounts.remove': {
        readonly params: AccountRemoveParams;
        readonly result: OkResult;
    };
    readonly 'accounts.usage': {
        readonly params: AccountsUsageParams;
        readonly result: AccountsUsageResult;
    };
    readonly 'teams.list': {
        readonly params: Record<string, never>;
        readonly result: readonly TeamSummary[];
    };
    readonly 'teams.create': {
        readonly params: TeamCreateParams;
        readonly result: TeamSummary;
    };
    readonly 'teams.setMember': {
        readonly params: TeamMemberParams;
        readonly result: TeamSummary;
    };
    readonly 'teams.remove': {
        readonly params: IdParams;
        readonly result: OkResult;
    };
    readonly 'shares.list': {
        readonly params: Record<string, never>;
        readonly result: readonly ShareSummary[];
    };
    readonly 'shares.create': {
        readonly params: ShareCreateParams;
        readonly result: ShareSummary;
    };
    readonly 'shares.setMember': {
        readonly params: ShareMemberParams;
        readonly result: ShareSummary;
    };
    readonly 'shares.remove': {
        readonly params: IdParams;
        readonly result: OkResult;
    };
    readonly 'design.asset.thumbnail': DesignAssetThumbnailMethod;
    /** One independent JSON decision, without tools or conversation state. */
    readonly 'decision.run': DecisionRunMethod;
}
/**
 * One account, as the control UI lists it.
 *
 * The principal and its profile flattened into one row on purpose. Every consumer needs both, they
 * are stored apart only because identity and accounts are separate layers, and making the page do
 * the join means the page owns a rule about what happens when one half is missing.
 */
export interface AccountSummary {
    readonly principalId: string;
    readonly displayName: string;
    readonly disabled: boolean;
    /** The role its grants match, or a count of custom ones. */
    readonly role: string;
    readonly workspacePath: string;
    readonly createdAt: number;
    /** The model this user chose, when they chose one. */
    readonly model?: string;
    /** Team ids they belong to. */
    readonly teams: readonly string[];
    /** Share ids they reach, with the mode they get. */
    readonly shares: readonly {
        readonly id: string;
        readonly mode: string;
    }[];
}
/** How the UI creates an account. */
export interface AccountCreateParams {
    readonly displayName: string;
    readonly localId?: string;
    readonly role?: string;
    readonly model?: string;
}
/** How the UI removes one. */
export interface AccountRemoveParams {
    readonly principalId: string;
    /**
     * Whether the workspace directory goes too. Defaults to FALSE.
     *
     * Explicit because deleting somebody's files as a side effect of removing their login is not a
     * decision a default should be making.
     */
    readonly removeWorkspace?: boolean;
}
/** A team, as the UI lists it. */
export interface TeamSummary {
    readonly id: string;
    readonly name: string;
    readonly createdAt: number;
    readonly members: readonly string[];
    readonly description?: string;
}
/** Creates a team. */
export interface TeamCreateParams {
    readonly name: string;
    readonly id?: string;
    readonly description?: string;
}
/** Adds or removes one principal. `member: false` removes. */
export interface TeamMemberParams {
    readonly teamId: string;
    readonly principalId: string;
    readonly member: boolean;
}
/** A shared folder, as the UI lists it. */
export interface ShareSummary {
    readonly id: string;
    readonly name: string;
    readonly path: string;
    readonly createdAt: number;
    readonly members: readonly {
        readonly subject: string;
        readonly id: string;
        readonly mode: string;
    }[];
    readonly description?: string;
}
/** Creates a share. */
export interface ShareCreateParams {
    readonly name: string;
    readonly id?: string;
    readonly path?: string;
    readonly description?: string;
}
/** Adds, re-modes or removes one subject. A `mode` of null removes. */
export interface ShareMemberParams {
    readonly shareId: string;
    readonly subject: string;
    readonly id: string;
    readonly mode: string | null;
}
/** What window to report spend over. */
export interface AccountsUsageParams {
    readonly fromMs?: number;
    readonly toMs?: number;
    /** One account, or every account when absent. */
    readonly userId?: string;
}
/** Per-user, per-model spend. Mirrors `AccountsUsageReport` over the wire. */
export interface AccountsUsageResult {
    readonly fromMs: number;
    readonly toMs: number;
    readonly totalMicrocents: number;
    readonly entries: number;
    readonly users: readonly {
        readonly userId: string;
        readonly displayName?: string;
        readonly microcents: number;
        readonly entries: number;
        readonly inputTokens: number;
        readonly outputTokens: number;
        readonly cachedInputTokens: number;
        readonly nonModelMicrocents: number;
        readonly models: readonly {
            readonly provider: string;
            readonly model: string;
            readonly microcents: number;
            readonly inputTokens: number;
            readonly outputTokens: number;
        }[];
    }[];
}
/** One setting, by dotted path. */
export interface ConfigWriteParams {
    readonly key: string;
    /**
     * The value, already parsed.
     *
     * A JSON value rather than a string, unlike the CLI's argument: a caller speaking this protocol
     * has types, and re-parsing a string here would make `"true"` and `true` indistinguishable at
     * exactly the boundary where the difference matters.
     */
    readonly value: JsonValue;
}
/** What a write did. */
export interface ConfigWriteResult {
    readonly ok: true;
    /** The file that was written. */
    readonly path: string;
    readonly key: string;
}
/** A method's name. */
/** Opens a spoken call. The conversation is the agent's, so a call can continue a typed thread. */
export interface VoiceStartParams {
    readonly conversationId?: string;
}
/** A started voice call. */
export interface VoiceStarted {
    readonly callId: string;
    /** The rate to capture at and to play back at. Resampling anywhere else is a defect. */
    readonly sampleRate: number;
    /** One frame, in bytes. A client that sends a different size adds latency for nothing. */
    readonly frameBytes: number;
}
/** One chunk of captured call audio. */
export interface VoiceAudioParams {
    readonly callId: string;
    /** Base64 PCM16, mono, at the rate the call reported. */
    readonly pcm: string;
}
/** Ends a voice call. */
export interface VoiceStopParams {
    readonly callId: string;
}
/** Every gateway method name. */
export type MethodName = keyof GatewayMethods;
/** A method's params. */
export type ParamsOf<M extends MethodName> = GatewayMethods[M]['params'];
/** A method's result. */
export type ResultOf<M extends MethodName> = GatewayMethods[M]['result'];
