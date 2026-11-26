// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** External resource identity; these families never confer access themselves. */
export const ResourceFamily = {
    Workspace: 'workspace',
    Computer: 'computer',
    Application: 'application',
    Database: 'database',
    Files: 'files',
    Feed: 'feed',
    Compute: 'compute',
};
/** Attaching access, reading data, and placing computation are different operations. */
export const ResourceUse = { Attach: 'attach', Read: 'read', Compute: 'compute' };
/** Readiness is orthogonal to visual identity and data freshness. */
export const ResourceState = {
    Ready: 'ready',
    Unconfigured: 'unconfigured',
    Disconnected: 'disconnected',
    Unauthorized: 'unauthorized',
    Unavailable: 'unavailable',
    Mock: 'mock',
};
/** The selected mode never silently promotes a simulated binding into a live operation. */
export const ResourceMode = { Live: 'live', Mock: 'mock' };
/** Actionable blocking reasons usable in the planner, inspector, and run view. */
export const ResourceIssue = {
    Setup: 'setup',
    Missing: 'missing',
    Unauthorized: 'unauthorized',
    Disconnected: 'disconnected',
    Unavailable: 'unavailable',
    Mock: 'mock',
    FixtureRequired: 'fixture-required',
    Identity: 'identity',
    Version: 'version',
    Capability: 'capability',
    Limit: 'limit',
    FreshnessUnknown: 'freshness-unknown',
    Stale: 'stale',
};
