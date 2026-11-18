// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Host-observed work, including model calls that do not produce answer text. */
export const TurnActivityPhase = {
    Preparing: 'preparing',
    Understanding: 'understanding',
    Planning: 'planning',
    Recalling: 'recalling',
    Thinking: 'thinking',
    Working: 'working',
    Verifying: 'verifying',
    Compacting: 'compacting',
};
