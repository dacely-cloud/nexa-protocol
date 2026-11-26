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
};
