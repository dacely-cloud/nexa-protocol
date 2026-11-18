// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Configurable bounds on gateway-owned work and memory. */
export interface GatewayLimits {
    /** Active sockets plus upgrades awaiting authentication. */
    readonly maxConnections: number;
    /** Admitted RPC handlers across the process. */
    readonly maxRequests: number;
    /** Admitted RPC handlers on one socket. */
    readonly maxRequestsPerConnection: number;
    /** Admitted RPC handlers across an authenticated principal's sockets. */
    readonly maxRequestsPerPrincipal: number;
    /** Incoming RPC bytes plus estimated input retained by active streams. */
    readonly maxRequestBytes: number;
    /**
     * Combined request, stream and partial-transfer input owned by one authenticated principal.
     *
     * @remarks
     * Optional because older gateways advertise only the process limits; current gateways always send it.
     */
    readonly maxRequestBytesPerPrincipal?: number;
    /** Streaming runs that have not finished cleanup. */
    readonly maxStreams: number;
    /** Streaming runs owned by one socket. */
    readonly maxStreamsPerConnection: number;
    /** Streaming runs owned by one authenticated principal. */
    readonly maxStreamsPerPrincipal: number;
    /** Distinct session subscriptions on one socket. */
    readonly maxSubscriptionsPerConnection: number;
    /** Estimated queued outbound storage and writes awaiting completion callbacks. */
    readonly maxOutboundBytes: number;
    /** Time after the WebSocket upgrade to complete the application handshake. */
    readonly handshakeTimeoutMs: number;
}
