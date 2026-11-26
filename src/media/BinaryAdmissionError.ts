// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Distinguishes denied allocation credit from malformed binary protocol data. */
export class BinaryAdmissionError extends RangeError {
    /** Allocation owners translate this failure to their backpressure policy and release credit. */
    public constructor(message: string = 'Binary request memory exceeds the gateway input budget') {
        super(message);
        this.name = 'BinaryAdmissionError';
    }
}
