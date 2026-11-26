// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { BinaryEnvelopePlan } from './BinaryEnvelopePlan.js';
import { Utf8Bytes } from './Utf8Bytes.js';
/** Allocates one admitted NXBF frame and writes carriers into it without a temporary full payload. */
export class BinaryEnvelopeEncoder {
    /** Preserves plaintext fallback and the existing byte order, part order and JSON placeholders. */
    static encode(raw) {
        const plan = new BinaryEnvelopePlan(raw);
        if (plan.carriers.length === 0) {
            return null;
        }
        const parts = plan.carriers.map((carrier) => carrier.part);
        const text = JSON.stringify({ json: plan.metadata(), parts });
        if (Utf8Bytes.measure(text, BinaryEnvelopePlan.MAX_HEADER_BYTES) !== plan.headerBytes) {
            throw new RangeError('Binary envelope metadata changed during encoding');
        }
        const header = new TextEncoder().encode(text);
        if (header.byteLength !== plan.headerBytes ||
            header.byteLength > BinaryEnvelopePlan.MAX_HEADER_BYTES) {
            throw new RangeError('Binary envelope metadata changed during encoding');
        }
        const frame = new Uint8Array(8 + header.length + plan.payloadBytes);
        const view = new DataView(frame.buffer);
        view.setUint32(0, 0x4e584246);
        view.setUint32(4, header.length);
        frame.set(header, 8);
        let offset = 8 + header.length;
        let carrier;
        for (carrier of plan.carriers) {
            carrier.mutateFrameBytes(frame, offset);
            offset += carrier.part.length;
        }
        return frame;
    }
}
