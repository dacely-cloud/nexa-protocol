// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Each storage authority has independently reported coverage. */
export const BrowserStorageGroup = {
    Local: 'local-storage',
    Session: 'session-storage',
    Cookies: 'cookies',
    IndexedDb: 'indexed-db',
    Cache: 'cache-storage',
};
/** A row distinguishes store existence, schema and record fingerprints. */
export const BrowserStorageKind = {
    Name: 'name',
    Value: 'value',
    Schema: 'schema',
    Record: 'record',
    CacheEntry: 'cache-entry',
};
