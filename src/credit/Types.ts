// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** The scopes a balance or budget can be defined over. */
export const CreditScope = {
    User: 'user',
    Agent: 'agent',
    Project: 'project',
    Conversation: 'conversation',
    /** Everything, for a deployment-wide cap. */
    Global: 'global',
} as const;

/** One credit scope. */
export type CreditScope = (typeof CreditScope)[keyof typeof CreditScope];

/** A spending limit over one scope. */
export interface Budget {
    readonly id: string;
    readonly scope: CreditScope;
    /** The scope's id (a user id, an agent id…). Ignored for `global`. */
    readonly scopeId: string;
    /** The cap in micro-cents for the window. */
    readonly limitMicrocents: number;
    /** The window the cap applies over. */
    readonly period: BudgetPeriod;
    /**
     * What happens at the cap.
     *
     * `block` refuses further spend; `warn` records and allows it. The default is `warn`, because a
     * budget that silently halts an enterprise agent mid-task is a worse failure than an overrun
     * somebody can see — blocking must be chosen deliberately.
     */
    readonly enforcement: BudgetEnforcement;
    /** Fractions of the limit at which to raise a warning (e.g. `[0.8, 0.95]`). */
    readonly alertThresholds?: readonly number[];
    readonly createdAt: number;
    readonly updatedAt: number;
}

/** The window a budget's limit applies over. */
export const BudgetPeriod = {
    Hourly: 'hourly',
    Daily: 'daily',
    Weekly: 'weekly',
    Monthly: 'monthly',
    /** Never resets — a prepaid balance. */
    Total: 'total',
} as const;

/** One budget period. */
export type BudgetPeriod = (typeof BudgetPeriod)[keyof typeof BudgetPeriod];

/** What a budget does when its limit is reached. */
export const BudgetEnforcement = {
    /** Record and allow. */
    Warn: 'warn',
    /** Refuse the spend. */
    Block: 'block',
} as const;

/** One budget enforcement mode. */
export type BudgetEnforcement = (typeof BudgetEnforcement)[keyof typeof BudgetEnforcement];

/** Spend totals over some slice of the ledger. */
export interface CreditSummary {
    /** Classified reports this authority accepts; absent on earlier deployments. */
    readonly supportedWorkloads?: readonly string[];
    /** Missing on older authorities; other includes historical unclassified usage. */
    readonly byCategory?: Readonly<Record<string, number>>;
    readonly scope: CreditScope;
    readonly scopeId: string;
    readonly from: number;
    readonly to: number;
    readonly microcents: number;
    readonly entries: number;
    readonly inputTokens: number;
    readonly outputTokens: number;
    readonly cachedInputTokens: number;
    /** Logical tokens newly retained; absent on older reporting authorities. */
    readonly cacheWriteTokens?: number;
    /** Totals split by charge kind, so "how much of this was voice" is answerable. */
    readonly byKind: Readonly<Record<string, number>>;
}
