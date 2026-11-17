// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { DesignPaint } from './DesignTypes.js';
import type { DesignFontBinding } from './DesignFontTypes.js';
import type { DesignResolvedTextDirection } from './DesignTextDirection.js';

/** Resolved style of a contiguous rich-text range. */
export interface DesignTextSpanStyle {
    /** Native paint stacks keep their whole-layer coordinates while glyph windows remain bounded. */
    readonly fills?: readonly DesignPaint[] | null;
    readonly direction?: DesignResolvedTextDirection;
    /** A bound style selects exactly the saved face instead of an available system family. */
    readonly font?: DesignFontBinding | null;
    readonly rich: boolean;
    readonly family: string;
    readonly size: number;
    readonly weight: number;
    readonly italic: boolean;
    readonly color: string;
    readonly underline: boolean;
}
