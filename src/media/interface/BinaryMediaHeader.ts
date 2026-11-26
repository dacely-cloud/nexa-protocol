// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { DeliveredAttachment } from '../DeliveredAttachment.js';

/** Validated known NXMD fields; arbitrary untrusted metadata never becomes application properties. */
export interface BinaryMediaHeader {
    readonly attachment: DeliveredAttachment;
    readonly streamId?: string;
    readonly sessionId?: string;
}
