// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Who paid for a model call. */
export const SpendRoute = {
    /** Nerva-provided access, charged to the user's wallet. */
    Wallet: 'wallet',
    /** Nerva-provided access an administrator exemption covers; the amount is what it would have cost. */
    Included: 'included',
    /** Billed by the provider to the user's own API key; the wallet is charged nothing. */
    Key: 'key',
    /** Covered by the user's subscription; the amount is the API-equivalent value at listed prices. */
    Subscription: 'subscription',
};
/**
 * `details.reason` of a `budget-exhausted` error refusing a wallet-billed turn because the wallet
 * has neither credit nor weekly allowance left.
 */
export const WALLET_EMPTY_REASON = 'wallet-empty';
