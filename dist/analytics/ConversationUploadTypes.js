// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Observation state controls recovery; a completed or uncertain original never restarts receiving bytes. */
export const ConversationDataUploadState = {
    Receiving: 'receiving',
    Publishing: 'publishing',
    Complete: 'complete',
    Canceled: 'canceled',
    Unconfirmed: 'unconfirmed',
};
