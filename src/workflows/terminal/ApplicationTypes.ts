// SPDX-License-Identifier: LicenseRef-Proprietary

export const WorkflowApplication = {
    Codex: 'codex',
    ClaudeCode: 'claude-code',
    GrokBuild: 'grok-build',
    NervaCode: 'nerva-code',
    MistralVibe: 'mistral-vibe',
} as const;
export type WorkflowApplication = (typeof WorkflowApplication)[keyof typeof WorkflowApplication];
