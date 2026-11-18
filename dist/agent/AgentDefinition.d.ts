import type { ReasoningOptions } from '../providers/Types.js';
/** One agent's configuration. */
export interface AgentDefinition {
    readonly id: string;
    /** What the agent calls itself. User-changeable at runtime ("call yourself Ada"). */
    readonly name: string;
    /**
     * The agent's own system prompt, replacing the default persona entirely when set.
     *
     * Per-agent rather than global because a deployment runs several agents with genuinely different
     * jobs — a code reviewer and a support responder should not share a persona.
     */
    readonly systemPrompt?: string;
    /** Appended to the assembled system prompt, for a tweak that should not discard the default. */
    readonly systemPromptSuffix?: string;
    readonly provider: string;
    readonly model: string;
    /** Tools this agent may use. Absent means every registered tool. */
    readonly tools?: readonly string[];
    /** Tools this agent may never use, applied after `tools`. */
    readonly excludeTools?: readonly string[];
    /**
     * The subset of `tools` whose DEFINITIONS are sent to the model.
     *
     * A rendering choice, never a permission — the deferred-tool catalog uses it to keep a thousand
     * schemas out of the context window while leaving the tools reachable through `tool_call` and
     * through a name the model remembers. `tools` and `excludeTools` are what decide whether a call
     * runs; conflating the two is how "the model was not shown it" gets mistaken for "the model
     * cannot use it", which is only true of a model that is not being steered by anybody.
     */
    readonly advertisedTools?: readonly string[];
    readonly reasoning?: ReasoningOptions;
    readonly temperature?: number;
    /** Nucleus sampling, forwarded unchanged to providers that support it. */
    readonly topP?: number;
    readonly maxTokens?: number;
    /** How many model round-trips one turn may take before it is stopped. */
    readonly maxIterations?: number;
    /** How the agent asks before acting. */
    readonly approvalMode?: ApprovalMode;
    /** Voice settings, when the agent speaks. */
    readonly voice?: AgentVoice;
    /** Free-form metadata a deployment attaches. */
    readonly metadata?: Readonly<Record<string, string>>;
}
/** How an agent speaks. */
export interface AgentVoice {
    /** The TTS provider id, e.g. `elevenlabs`. */
    readonly provider: string;
    /** The provider's voice id. */
    readonly voiceId: string;
    /** Whether replies are spoken by default. */
    readonly autoSpeak?: boolean;
}
/** How much the agent asks before acting. */
export declare const ApprovalMode: {
    /** Ask before anything with a side effect. */
    readonly Cautious: 'cautious';
    /** Ask before executing code or writing outside the workspace. */
    readonly Standard: 'standard';
    /** Ask only before destructive actions. */
    readonly Permissive: 'permissive';
    /**
     * Never ask.
     *
     * A deliberate, named choice rather than a `--force` flag, so an unattended deployment can
     * select it explicitly and a UI can show plainly that nothing will be confirmed.
     */
    readonly Unattended: 'unattended';
};
/** A supported approval policy derived from its runtime names. */
export type ApprovalMode = (typeof ApprovalMode)[keyof typeof ApprovalMode];
