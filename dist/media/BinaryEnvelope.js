// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { BinaryEnvelopeEncoder } from './BinaryEnvelopeEncoder.js';
import { BinaryUploadHeader } from './BinaryUploadHeader.js';
import { BinaryEnvelopeDecoder } from './BinaryEnvelopeDecoder.js';
/** NXBF envelopes replace inline media and PCM strings with raw, contiguous bytes. */
export class BinaryEnvelope {
    /** Parses a JSON-facing message and projects admitted byte carriers into an NXBF frame. */
    static encode(text) {
        const raw = JSON.parse(text);
        return BinaryEnvelope.encodeValue(raw);
    }
    /** Extracts carriers before JSON serialization, so large files never create giant JSON frames. */
    static encodeValue(raw) {
        return BinaryEnvelopeEncoder.encode(raw);
    }
    /** Encodes one disk upload chunk without converting its bytes to a string. */
    static encodeUploadChunk(requestId, uploadId, offset, bytes) {
        const header = BinaryUploadHeader.encode(requestId, uploadId, offset, bytes.byteLength);
        const frame = new Uint8Array(8 + header.byteLength + bytes.byteLength);
        const view = new DataView(frame.buffer);
        view.setUint32(0, 0x4e584246);
        view.setUint32(4, header.byteLength);
        frame.set(header, 8);
        frame.set(bytes, 8 + header.byteLength);
        return frame;
    }
    /** Restores an admitted frame; optional allocation credit remains owned by its request. */
    static decode(buffer, maxBytes, maxJsonBytes = Math.ceil(maxBytes / 3) * 4, admission) {
        return BinaryEnvelopeDecoder.decode(buffer, maxBytes, maxJsonBytes, admission);
    }
}
