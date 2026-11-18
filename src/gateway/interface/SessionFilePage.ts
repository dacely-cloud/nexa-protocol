// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { DeliveredAttachment } from '../../media/DeliveredAttachment.js';

/** One bounded page, tied to an unchanged archive-directory revision. */
export interface SessionFilePage {
    /** @maxItems 128 */
    readonly files: readonly DeliveredAttachment[];
    /** @maxLength 73 */
    readonly nextCursor: string | null;
    /** @maxLength 36 */
    readonly revision: string;
}
