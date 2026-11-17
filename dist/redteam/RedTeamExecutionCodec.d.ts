import { type RedTeamExecutionAction, type RedTeamActionTarget, type RedTeamHistorySelection } from './RedTeamExecutionTypes.js';
/** Validate every execution reference before it crosses storage or the gateway. */
export declare class RedTeamExecutionCodec {
    /** Require both selectors before a native frame can be opened from its actual parent. */
    static historySelection(raw: unknown): RedTeamHistorySelection;
    /** Validate one bounded target without granting access to its supplied path. */
    static target(raw: unknown): RedTeamActionTarget;
    static action(raw: unknown): RedTeamExecutionAction;
}
