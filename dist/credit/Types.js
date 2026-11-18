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
};
/** The window a budget's limit applies over. */
export const BudgetPeriod = {
    Hourly: 'hourly',
    Daily: 'daily',
    Weekly: 'weekly',
    Monthly: 'monthly',
    /** Never resets — a prepaid balance. */
    Total: 'total',
};
/** What a budget does when its limit is reached. */
export const BudgetEnforcement = {
    /** Record and allow. */
    Warn: 'warn',
    /** Refuse the spend. */
    Block: 'block',
};
