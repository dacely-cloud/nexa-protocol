// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** The four authoring roles have different scheduling semantics. */
export const ComponentRole = {
    Trigger: 'trigger',
    Step: 'step',
    Resource: 'resource',
    Visual: 'visual',
};
/** Catalog grouping retains all requested capability areas without declaring runtime support. */
export const ComponentCategory = {
    Triggers: 'triggers',
    Connections: 'connections',
    Api: 'api',
    Transform: 'transform',
    Conditions: 'conditions',
    Flow: 'flow',
    Time: 'time',
    Agents: 'agents',
    Prompts: 'prompts',
    Models: 'models',
    Context: 'context',
    Research: 'research',
    Tools: 'tools',
    Programs: 'programs',
    Browser: 'browser',
    Media: 'media',
    Documents: 'documents',
    Messaging: 'messaging',
    Storage: 'storage',
    Teams: 'teams',
    Planning: 'planning',
    Human: 'human',
    Quality: 'quality',
    Cache: 'cache',
    Policy: 'policy',
    Output: 'output',
    Utilities: 'utilities',
    Resources: 'resources',
    Observability: 'observability',
    Entities: 'entities',
    Experiments: 'experiments',
    Collection: 'collection',
};
export const PortDirection = { Input: 'input', Output: 'output' };
export const PortCardinality = { Item: 'item', List: 'list', Stream: 'stream' };
/** Multiple inputs require an explicit collector or join. Last-writer-wins is not an option. */
export const IncomingPolicy = { Reject: 'reject', Collect: 'collect', Join: 'join' };
export const ComponentEffect = {
    Pure: 'pure',
    Inference: 'inference',
    External: 'external',
    Wait: 'wait',
};
export const MockBehavior = {
    Deterministic: 'deterministic',
    Fixture: 'fixture',
    None: 'none',
};
