import type { BinaryChunkBudget } from './interface/BinaryChunkBudget.js';
/** Finite local storage accounting that can share an additional parent ceiling. */
export declare class BinaryByteBudget implements BinaryChunkBudget {
    #private;
    /** Both ceilings must admit storage before an allocation or retained lifetime starts. */
    constructor(limit: number, parent?: BinaryChunkBudget);
    /** Immutable ceiling; subclasses can add state without changing this counter's authority. */
    get limit(): number;
    /** Currently retained storage owned by this budget. */
    get used(): number;
    /** Claims local and parent credit together, without queuing work. */
    reserve(bytes: number): boolean;
    /** Returns only storage this budget actually owns, including its parent's corresponding charge. */
    release(bytes: number): void;
}
