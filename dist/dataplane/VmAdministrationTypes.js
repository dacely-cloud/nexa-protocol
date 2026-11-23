// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** A persistent guest cannot silently change CPU architecture. */
export const VmAdministrationArchitecture = {
    X86_64: 'x86_64',
    Arm64: 'aarch64',
};
/** Runtime policy is reported independently of sampled host hardware. */
export const VmAdministrationRuntime = {
    Cpu: 'qemu-cpu',
    Gpu: 'qemu-gpu',
};
/** Named lifecycle operations reported by the authoritative Compute queue. */
export const VmAdministrationOperationKind = {
    Provision: 'provision',
    Start: 'start',
    Stop: 'stop',
    Resize: 'resize',
    Backup: 'backup',
    Restore: 'restore',
    Delete: 'delete',
};
/** Queue completion does not assert a direct live guest health measurement. */
export const VmAdministrationOperationPhase = {
    Queued: 'queued',
    Running: 'running',
    Reconciling: 'reconciling',
    Succeeded: 'succeeded',
    Failed: 'failed',
};
/** Only platform-authored bounded progress stages cross this management surface. */
export const VmAdministrationProgressStage = {
    Queued: 'queued',
    Claimed: 'claimed',
    Reconciling: 'reconciling',
    Reserving: 'reserving',
    Volumes: 'creating-volumes',
    Network: 'configuring-network',
    Booting: 'booting',
    Ssh: 'waiting-for-ssh',
    Tooling: 'preparing-tools',
    BackingUp: 'backing-up',
    Restoring: 'restoring',
    Stopping: 'stopping',
    Completed: 'completed',
    Failed: 'failed',
};
/** Management is restricted to implemented qualified-account lifecycle operations. */
export const VmAdministrationAction = {
    Inspect: 'inspect',
    Provision: 'provision',
    Start: 'start',
    Stop: 'stop',
    Delete: 'delete',
};
/** These are shared control-plane observations, not a substitute for direct guest health checks. */
export const VmAdministrationState = {
    Unprovisioned: 'unprovisioned',
    Preparing: 'preparing',
    Reserved: 'reserved',
    Active: 'active',
    Stopping: 'stopping',
    Stopped: 'stopped',
    Recovery: 'recovery-required',
};
