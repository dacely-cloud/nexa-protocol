// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** A destination excludes response tokens and distinguishes threaded conversations. */
export interface DeliveryDestination {
    readonly channel: string;
    readonly conversationId: string;
    readonly threadId: string | null;
}

/** Exact bytes included in a host-created ZIP, rather than a separate channel upload. */
export interface DeliveryArchiveMember {
    readonly path: string;
    readonly sha256: string;
    readonly byteLength: string;
}

/** Host receipt for the exact bytes submitted to an acknowledged channel send. */
export interface DeliveryReceipt {
    readonly id: string;
    readonly sessionId: string;
    readonly taskId: string | null;
    readonly revision: string | null;
    readonly turnId: string | null;
    readonly toolCallId: string;
    readonly path: string | null;
    readonly mediaId: string | null;
    readonly filename: string;
    readonly mimeType: string;
    readonly sha256: string;
    readonly byteLength: string;
    /** Present only for a host-created ZIP; the receipt itself identifies the delivered ZIP. */
    readonly archiveMembers?: readonly DeliveryArchiveMember[];
    readonly destination: DeliveryDestination;
    readonly acknowledgment: DeliveryDestination;
    readonly messageId: string | null;
    readonly at: string;
}
