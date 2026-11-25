import type { WorkflowApplication } from '../workflows/terminal/ApplicationTypes.js';
import type { WorkflowApplicationStatus, WorkflowTerminalSnapshot } from '../workflows/terminal/TerminalTypes.js';
/** Licensed desktop software a user links once and Nexa installs on that user's own VM. */
export declare const LicensedTool: {
    readonly IdaPro: 'ida-pro';
};
/** Union of {@link LicensedTool} values. */
export type LicensedTool = (typeof LicensedTool)[keyof typeof LicensedTool];
/** Hex-Rays product families whose installers include idalib for headless analysis. */
export declare const IdaEdition: {
    readonly Pro: 'ida-pro';
    readonly Essential: 'ida-essential';
};
/** Union of {@link IdaEdition} values. */
export type IdaEdition = (typeof IdaEdition)[keyof typeof IdaEdition];
/** Where a licensed tool stands on the authenticated account's VM. */
export declare const LicensedToolState: {
    readonly NotConnected: 'not-connected';
    readonly NotInstalled: 'not-installed';
    readonly Installing: 'installing';
    readonly Installed: 'installed';
    readonly Outdated: 'outdated';
    readonly Failed: 'failed';
    readonly Unavailable: 'unavailable';
};
/** Union of {@link LicensedToolState} values. */
export type LicensedToolState = (typeof LicensedToolState)[keyof typeof LicensedToolState];
/** Install state of one licensed tool. It never carries a license, key or vendor output. */
export interface LicensedToolStatus {
    readonly tool: LicensedTool;
    readonly title: string;
    readonly state: LicensedToolState;
    /** Installed product family, or null before installation. */
    readonly edition: string | null;
    /** Bounded user-facing explanation of the current state. */
    readonly detail: string;
}
/** Every licensed tool the deployment can install. */
export interface LicensedToolsPage {
    readonly tools: readonly LicensedToolStatus[];
}
/** Names one licensed tool on the authenticated account's VM. */
export interface LicensedToolRequest {
    readonly tool: LicensedTool;
}
/** Account-level sign-in state of every subscription application on the user's VM. */
export interface ConnectionApplicationsPage {
    readonly applications: readonly WorkflowApplicationStatus[];
}
/** Opens the application's own login flow in a terminal on the user's VM. */
export interface ConnectionApplicationSetupRequest {
    readonly application: WorkflowApplication;
    readonly sessionId: string;
}
/** Who runs a chat model the user selected. */
export declare const ChatModelSource: {
    /** The user's own provider API key, called from Nexa with direct billing. */
    readonly ApiKey: 'api-key';
    /** The user's signed-in Codex or Claude Code CLI, running on the user's VM. */
    readonly Subscription: 'subscription';
};
/** Union of {@link ChatModelSource} values. */
export type ChatModelSource = (typeof ChatModelSource)[keyof typeof ChatModelSource];
/** A user-connected chat model. Absent means the deployment's own Nexa model. */
export interface ChatModelSelection {
    readonly source: ChatModelSource;
    /** Provider id for API keys, or the application id for subscriptions. */
    readonly provider: string;
    readonly model: string;
}
/**
 * The model that answers when a selected subscription model declines a request on a safety refusal.
 *
 * @remarks
 * The selected model stays the user's choice: the fallback answers the declined message and the
 * following ones up to {@link SafeguardFallback.messages}, then the selected model resumes.
 */
export interface SafeguardFallback {
    /** A connected model to answer with; absent selects the Nexa model. */
    readonly model?: ChatModelSelection;
    /**
     * How many messages the fallback answers, counting the declined one, before the selected model resumes.
     * @minimum 1
     * @maximum 50
     * @TJS-type integer
     */
    readonly messages: number;
}
/** One selectable chat model backed by the user's own key or subscription. */
export interface ChatModelChoice extends ChatModelSelection {
    readonly name: string;
    readonly providerName: string;
}
/** Chat models the authenticated account has connected. */
export interface ChatModelsPage {
    readonly items: readonly ChatModelChoice[];
}
/** `connections.applications.check` contract. */
export interface ConnectionApplicationsCheckMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: ConnectionApplicationsPage;
}
/** `connections.applications.setup` contract. */
export interface ConnectionApplicationsSetupMethod {
    readonly params: ConnectionApplicationSetupRequest;
    readonly result: WorkflowTerminalSnapshot;
}
/** `connections.tools.status` contract. */
export interface ConnectionToolsStatusMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: LicensedToolsPage;
}
/** `connections.tools.install` contract. */
export interface ConnectionToolsInstallMethod {
    readonly params: LicensedToolRequest;
    readonly result: LicensedToolStatus;
}
/** `connections.tools.remove` contract. */
export interface ConnectionToolsRemoveMethod {
    readonly params: LicensedToolRequest;
    readonly result: LicensedToolStatus;
}
/** `connections.models.list` contract. */
export interface ConnectionModelsListMethod {
    readonly params: Readonly<Record<string, never>>;
    readonly result: ChatModelsPage;
}
