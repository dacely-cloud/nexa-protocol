export declare const WorkflowApplication: {
    readonly Codex: 'codex';
    readonly ClaudeCode: 'claude-code';
    readonly GrokBuild: 'grok-build';
    readonly NervaCode: 'nerva-code';
    readonly MistralVibe: 'mistral-vibe';
};
export type WorkflowApplication = (typeof WorkflowApplication)[keyof typeof WorkflowApplication];
