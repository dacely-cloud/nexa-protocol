// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type {
    RedTeamEffort,
    RedTeamEffortRequest,
    RedTeamGetRequest,
    RedTeamListPage,
    RedTeamListRequest,
    RedTeamSnapshot,
    RedTeamStartRequest,
    RedTeamUpdateRequest,
} from '../redteam/RedTeamTypes.js';

/** Durable effort acceptance under the verified socket owner. */
export interface RedTeamStartMethod {
    readonly params: RedTeamStartRequest;
    readonly result: RedTeamEffort;
}

/** Bounded metadata directory without agent transcripts. */
export interface RedTeamListMethod {
    readonly params: RedTeamListRequest;
    readonly result: RedTeamListPage;
}

/** A revision-pinned view of the effort and its ledger. */
export interface RedTeamGetMethod {
    readonly params: RedTeamGetRequest;
    readonly result: RedTeamSnapshot;
}

/** An acknowledged cancellation request independent of the viewer connection. */
export interface RedTeamStopMethod {
    readonly params: RedTeamEffortRequest;
    readonly result: RedTeamEffort;
}

/** Compare-and-set changes to the owner's active effort. */
export interface RedTeamUpdateMethod {
    readonly params: RedTeamUpdateRequest;
    readonly result: RedTeamEffort;
}
