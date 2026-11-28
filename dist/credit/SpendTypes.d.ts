/** Who paid for a model call. */
export declare const SpendRoute: {
    /** Nerva-provided access, charged to the user's wallet. */
    readonly Wallet: 'wallet';
    /** Nerva-provided access an administrator exemption covers; the amount is what it would have cost. */
    readonly Included: 'included';
    /** Billed by the provider to the user's own API key; the wallet is charged nothing. */
    readonly Key: 'key';
    /** Covered by the user's subscription; the amount is the API-equivalent value at listed prices. */
    readonly Subscription: 'subscription';
};
/** Union of {@link SpendRoute} values. */
export type SpendRoute = (typeof SpendRoute)[keyof typeof SpendRoute];
/**
 * `details.reason` of a `budget-exhausted` error refusing a wallet-billed turn because the wallet
 * has neither credit nor weekly allowance left.
 */
export declare const WALLET_EMPTY_REASON: 'wallet-empty';
/** Token counts of a slice of spend. */
export interface SpendTokens {
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly inputTokens: number;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly outputTokens: number;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly cachedInputTokens: number;
}
/** How a spend amount was obtained and how many calls it covers. */
export interface SpendAmount {
    /**
     * USD microcents (1e-8 USD) as a decimal string: what the wallet or the key was charged, or the
     * API-equivalent value for subscription and included usage. Calls with no known price add nothing.
     */
    readonly microcents: string;
    /** True when part of the amount was priced from listed rates rather than reported by the provider. */
    readonly estimated: boolean;
    /**
     * @minimum 0
     * @TJS-type integer
     */
    readonly calls: number;
    /**
     * Calls with no known price, which `microcents` leaves out; equal to `calls` means no price is known.
     * @minimum 0
     * @TJS-type integer
     */
    readonly unpricedCalls: number;
}
/** One model's spend on one route in a reply or a conversation. */
export interface SpendLine extends SpendAmount, SpendTokens {
    readonly route: SpendRoute;
    /**
     * Who was charged: `nerva` for the wallet and exemptions, the API key's provider id (`openrouter`,
     * `anthropic`, ...) or the subscription's application id (`claude-code`, `codex`, ...).
     */
    readonly via: string;
    /** The model that ran, as its provider names it. */
    readonly model: string;
}
/** What one reply's model calls cost, by who paid; its sub-agents included. */
export interface ReplyCost {
    readonly lines: readonly SpendLine[];
}
/** One model's spend on a route over today, this month and all time. */
export interface SpendModelTotals extends SpendTokens {
    readonly model: string;
    /** Today, UTC. */
    readonly today: SpendAmount;
    /** This calendar month, UTC. */
    readonly month: SpendAmount;
    readonly total: SpendAmount;
}
/** One route's spend, such as one API key or one subscription, with its models. */
export interface SpendSourceTotals {
    readonly route: SpendRoute;
    /** As {@link SpendLine.via}. */
    readonly via: string;
    readonly today: SpendAmount;
    readonly month: SpendAmount;
    readonly total: SpendAmount;
    readonly models: readonly SpendModelTotals[];
}
/** One conversation's spend by route and model. */
export interface ConversationSpend {
    readonly conversationId: string;
    readonly lines: readonly SpendLine[];
}
/** `credit.spend` parameters. */
export interface SpendParams {
    /** Also returns this conversation's spend; the conversation must belong to the caller. */
    readonly conversationId?: string;
}
/** The caller's model spend by who paid: wallet, each API key and each subscription. */
export interface SpendPage {
    /** Epoch milliseconds the totals were read. */
    readonly asOf: number;
    readonly sources: readonly SpendSourceTotals[];
    readonly conversation?: ConversationSpend;
}
