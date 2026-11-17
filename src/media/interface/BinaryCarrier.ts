// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { BinaryPart } from './BinaryPart.js';

/** Prevalidated carrier borrowing unchanged input until the synchronous encoder copies it. */
export interface BinaryCarrier {
    /** Immutable framing metadata retained by the plan. */
    readonly part: BinaryPart;
    /** Mutates only the encoder's newly allocated frame; avoids another full carrier allocation. */
    readonly mutateFrameBytes: (mutateDestination: Uint8Array, offset: number) => void;
}
