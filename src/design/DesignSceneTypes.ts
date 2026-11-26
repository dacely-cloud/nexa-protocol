// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { DesignNode } from './DesignTypes.js';

/** Render identity preserves both editable source and instance ownership. */
export interface DesignSceneNode extends DesignNode {
    readonly sourceId: string;
    readonly instanceId: string | null;
    /** Source boxes remain editable while only their owning Boolean silhouette is painted. */
    readonly booleanOwner?: string;
    /** Hidden source forests are painted only into their owning mask surface. */
    readonly maskOwner?: string;
}
