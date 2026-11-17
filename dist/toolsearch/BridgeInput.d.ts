import type { JsonValue } from '../json/JsonValue.js';
/** Portable bridge envelope used by execution and observation of the same call. */
export interface ToolCallInput {
    readonly name: string;
    readonly arguments?: JsonValue;
}
/** Remove redundant bridge envelopes before risk assessment, authorization and dispatch. */
export declare function resolveBridgeInput(input: ToolCallInput): ToolCallInput | null;
