// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Why a turn is answered by the safeguard fallback model instead of the selected one. */
export const SafeguardFallbackCause = {
    /** The selected model declined this message on a safety refusal. */
    Declined: 'declined',
    /** A recent refusal still pauses the selected model for this message. */
    Continuing: 'continuing',
};
