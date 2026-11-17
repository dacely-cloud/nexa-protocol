import type { BinaryCarrier } from './interface/BinaryCarrier.js';
import type { BinaryJsonValue } from './interface/BinaryJsonValue.js';
/** Validates and measures the whole envelope before copying metadata or allocating its frame. */
export declare class BinaryEnvelopePlan {
    #private;
    /** Existing NXBF metadata limit; byte bodies retain the separate 300 MiB media ceiling. */
    static readonly MAX_HEADER_BYTES: number;
    /** Borrows input for one synchronous encode; callers retain it unchanged until framing completes. */
    constructor(raw: unknown);
    /** Original carriers whose writes are deferred until complete admission. */
    get carriers(): readonly BinaryCarrier[];
    /** Exact total of admitted raw carrier lengths. */
    get payloadBytes(): number;
    /** Exact projected UTF-8 header size, or a saturation value when no binary frame is needed. */
    get headerBytes(): number;
    /** Copies only admitted metadata; carriers become null without enumerating their byte values. */
    metadata(): BinaryJsonValue;
}
