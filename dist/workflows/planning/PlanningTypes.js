// SPDX-License-Identifier: LicenseRef-Proprietary
export const RequirementState = {
    Drafted: 'drafted',
    Missing: 'missing',
    Question: 'question',
};
export const PlanningStatus = {
    Working: 'working',
    Complete: 'complete',
    Failed: 'failed',
    Canceled: 'canceled',
};
export const PlanningLimits = {
    requestBytes: 1_048_576,
    responseBytes: 524_288,
    nodes: 1000,
    edges: 4000,
    messageCharacters: 16_000,
    timeoutMs: 180_000,
};
