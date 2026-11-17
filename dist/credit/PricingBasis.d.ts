/** Reporting amounts do not all represent a debit to the account wallet. */
export declare const PricingBasis: {
    readonly Wallet: 'wallet';
    readonly Estimate: 'estimate';
    readonly Unpriced: 'unpriced';
    readonly Local: 'local';
    readonly IncludedEstimate: 'included-estimate';
    readonly IncludedUnpriced: 'included-unpriced';
    readonly Adjustment: 'adjustment';
};
/** Classification assigned by the host path that performed the metering. */
export type PricingBasis = (typeof PricingBasis)[keyof typeof PricingBasis];
