// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Licensed desktop software a user links once and Nexa installs on that user's own VM. */
export const LicensedTool = {
    IdaPro: 'ida-pro',
};
/** Hex-Rays product families whose installers include idalib for headless analysis. */
export const IdaEdition = {
    Pro: 'ida-pro',
    Essential: 'ida-essential',
};
/** Where a licensed tool stands on the authenticated account's VM. */
export const LicensedToolState = {
    NotConnected: 'not-connected',
    NotInstalled: 'not-installed',
    Installing: 'installing',
    Installed: 'installed',
    Outdated: 'outdated',
    Failed: 'failed',
    Unavailable: 'unavailable',
};
/** Who runs a chat model the user selected. */
export const ChatModelSource = {
    /** The user's own provider API key, called from Nexa with direct billing. */
    ApiKey: 'api-key',
    /** The user's signed-in Codex or Claude Code CLI, running on the user's VM. */
    Subscription: 'subscription',
    /** Maestro, which picks the model for every step. Selected as provider `nerva`, model `maestro`. */
    Maestro: 'maestro',
    /**
     * Nerva-provided access billed to the user's wallet at what the call cost. `provider` is the
     * gateway Nerva reaches the model through (`openrouter`) and `model` the gateway's model id.
     * A plan or key the user connected for the same model is used instead when the turn starts.
     */
    Nerva: 'nerva',
};
/** What Nerva's tool-calling conformance check found for a model. */
export const ChatModelToolCalling = {
    Reliable: 'reliable',
    Unreliable: 'unreliable',
};
/** Whether the account's wallet can pay for wallet-billed models. */
export const ChatModelWalletState = {
    /** Credit or weekly allowance is available. */
    Funded: 'funded',
    /** Neither credit nor weekly allowance is left; wallet-billed turns are refused before they start. */
    Empty: 'empty',
    /** An administrator exemption covers usage; nothing is charged. */
    Included: 'included',
};
