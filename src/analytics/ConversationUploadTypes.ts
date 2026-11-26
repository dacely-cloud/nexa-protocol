// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { DataUploadContext } from './DataUploadTargetTypes.js';
import type { DataUpload } from './DataUploadTypes.js';

/** Observation state controls recovery; a completed or uncertain original never restarts receiving bytes. */
export const ConversationDataUploadState = {
    Receiving: 'receiving',
    Publishing: 'publishing',
    Complete: 'complete',
    Canceled: 'canceled',
    Unconfirmed: 'unconfirmed',
} as const;

/** No absence/error is interpreted as an empty new upload. */
export type ConversationDataUploadState =
    (typeof ConversationDataUploadState)[keyof typeof ConversationDataUploadState];

/** Upload byte admission always returns its exact conversation placement comparison. */
export interface ConversationDataUpload extends DataUpload {
    readonly context: DataUploadContext;
    readonly offset: string;
    readonly state: ConversationDataUploadState;
}

/** Completed files remain opaque source references, with a display path only after verified delivery. */
export interface ConversationDataFile extends ConversationDataUpload {
    readonly state: typeof ConversationDataUploadState.Complete;
    readonly path: string;
    readonly sha256: string | null;
}
