/** Allocation accounting shared by active chunk receivers. */
export interface BinaryChunkBudget {
    readonly reserve: (bytes: number) => boolean;
    readonly release: (bytes: number) => void;
    /** Host-created bindings may share an immutable principal and budget authority. */
    readonly matches?: (budget: BinaryChunkBudget) => boolean;
}
