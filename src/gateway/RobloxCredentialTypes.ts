// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Stores the account's Roblox Open Cloud API key. */
export interface RobloxCredentialSetParams {
    readonly apiKey: string;
}

/** Presence only: neither saved key material nor claims about Roblox permissions. */
export interface RobloxCredentialStatus {
    readonly connected: boolean;
    readonly validated: false;
}
