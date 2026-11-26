// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Monitoring never starts, resumes or creates an environment. */
export const VmUsageState = {
    Preparing: 'preparing',
    Running: 'running',
    Stopped: 'stopped',
    Unavailable: 'unavailable',
};
/** Each independently collected observation retains its own freshness. */
export const VmUsageFreshness = {
    Fresh: 'fresh',
    Stale: 'stale',
};
/** CPU time is measured by the hypervisor; guest RAM/filesystem values are informational. */
export const VmUsageSource = {
    Hypervisor: 'hypervisor',
    Guest: 'guest',
};
