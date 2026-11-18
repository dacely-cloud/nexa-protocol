// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Coarse caller-supplied regional preferences, never authorization or precise geolocation. */
export interface UserRegion {
    readonly countryCode?: string;
    readonly locale?: string;
    readonly timeZone?: string;
}
