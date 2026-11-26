// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

import type { RobloxInputRequest } from './RobloxSceneTypes.js';

/** A logical activation on the retained VM's current clock. */
export interface RobloxLiveActivation extends Omit<RobloxInputRequest, 'at'> {}
