/** Exact USD microcent balances encoded as decimal strings for JSON clients. */
export interface WalletSnapshot {
    readonly userId: string;
    readonly asOf: number;
    readonly resetsAt: number;
    readonly credits: string;
    readonly creditsHeld: string;
    readonly creditsAvailable: string;
    readonly weeklyLimit: string;
    readonly weeklyUsed: string;
    readonly weeklyHeld: string;
    readonly weeklyAvailable: string;
}
/** A durable payment or settled request, without exposing provider payment identifiers. */
export interface WalletHistoryEntry {
    readonly sequence: string;
    readonly kind: 'purchase' | 'usage';
    readonly amount: string;
    readonly plan: string;
    readonly paid: string;
    readonly recordedAt: number;
}
/** Cursor pagination remains stable when new transactions arrive. */
export interface WalletHistoryPage {
    readonly userId: string;
    readonly entries: readonly WalletHistoryEntry[];
    readonly next: string | null;
}
