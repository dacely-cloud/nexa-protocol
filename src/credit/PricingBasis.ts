// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Reporting amounts do not all represent a debit to the account wallet. */
export const PricingBasis = {
    Wallet: 'wallet',
    Estimate: 'estimate',
    Unpriced: 'unpriced',
    Local: 'local',
    IncludedEstimate: 'included-estimate',
    IncludedUnpriced: 'included-unpriced',
    Adjustment: 'adjustment',
} as const;
/** Classification assigned by the host path that performed the metering. */
export type PricingBasis = (typeof PricingBasis)[keyof typeof PricingBasis];
