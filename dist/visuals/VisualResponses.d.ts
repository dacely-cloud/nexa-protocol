import { type VisualResponse } from './VisualResponse.js';
export type { VisualResponse, VisualElement, VisualConnection, VisualPoint, VisualStep, } from './VisualResponse.js';
export { VisualTone, VisualElementKind, VisualIcon, VisualSide, VisualLine, VisualArrow, } from './VisualResponse.js';
/** One portable decoder protects native tool execution, network receipt and restored history. */
export declare class VisualResponses {
    #private;
    /** Normalize optional presentation fields and reject geometry, references or styles that cannot be rendered. */
    static parse(raw: unknown, complete?: boolean): VisualResponse;
    /** Validators reject malformed scenes without leaking an exception into socket handling. */
    static isValid(raw: unknown): raw is VisualResponse;
}
