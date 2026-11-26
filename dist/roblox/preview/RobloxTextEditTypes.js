// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Host editing operations act on the current native focus without accepting target ids. */
export const RobloxTextEditKind = {
    Insert: 'Insert',
    Selection: 'Selection',
    Key: 'Key',
};
/** Supported logical editing keys; complete physical keyboard routing is separate. */
export const RobloxTextEditKey = {
    Left: 'Left',
    Right: 'Right',
    Home: 'Home',
    End: 'End',
    Backspace: 'Backspace',
    Delete: 'Delete',
    Return: 'Return',
    Escape: 'Escape',
};
