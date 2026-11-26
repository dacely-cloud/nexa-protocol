// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { ChatModelSelection } from '../connections/ConnectionTypes.js';

/** Editable instructions and tool limits for one account-owned agent. */
export interface AgentProfileInput {
    /** Display name.
     * @minLength 1
     * @maxLength 80
     */
    readonly name: string;
    /** Short purpose shown in the profile list.
     * @maxLength 2000
     */
    readonly description: string;
    /** Static instructions appended within the inherited policy.
     * @minLength 1
     * @maxLength 16000
     */
    readonly instructions: string;
    /** Configured provider identifier; empty inherits Nexa.
     * @maxLength 128
     */
    readonly provider: string;
    /** Configured model identifier; empty inherits Nexa.
     * @maxLength 256
     */
    readonly model: string;
    /** An account-owned API key or subscription; absent inherits the current Chat model. */
    readonly modelConnection?: ChatModelSelection;
    /** Optional narrowing of the inherited tools.
     * @maxItems 128
     */
    readonly tools: readonly string[] | null;
}

/** A private profile with a server-generated identity and exact revision. */
export interface AgentProfile extends AgentProfileInput {
    /** Server-generated selector.
     * @pattern ^profile:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$
     * @maxLength 44
     */
    readonly id: string;
    /** Exact optimistic revision.
     * @pattern ^(?:0|[1-9][0-9]{0,19})$
     * @maxLength 20
     */
    readonly revision: string;
}

/** The authenticated account's current profile directory. */
export interface AgentProfilesResult {
    /** The owner can explicitly import an earlier saved profile library. */
    readonly upgradeAvailable: boolean;
    /** Exact account configuration revision used for creation admission.
     * @pattern ^(?:0|[1-9][0-9]{0,19})$
     * @maxLength 20
     */
    readonly directoryRevision: string;
    /** Private directory capped per account.
     * @maxItems 64
     */
    readonly profiles: readonly AgentProfile[];
}

/** Input for creating a profile under the authenticated account. */
export interface AgentProfileCreateParams {
    /** Stable creation identity reused after an ambiguous acknowledgement.
     * @pattern ^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$
     * @maxLength 36
     */
    readonly requestId: string;
    /** Directory revision captured when this creation was prepared.
     * @pattern ^(?:0|[1-9][0-9]{0,19})$
     * @maxLength 20
     */
    readonly expectedDirectoryRevision: string;
    readonly profile: AgentProfileInput;
}

/** A complete optimistic replacement of one account-owned profile. */
export interface AgentProfileUpdateParams {
    readonly id: string;
    readonly expectedRevision: string;
    readonly profile: AgentProfileInput;
}

/** An optimistic deletion that cannot remove another revision. */
export interface AgentProfileDeleteParams {
    readonly id: string;
    readonly expectedRevision: string;
}

/** Explicitly imports saved profiles at the account's current directory revision. */
export interface AgentProfileUpgradeParams {
    readonly expectedDirectoryRevision: string;
}
