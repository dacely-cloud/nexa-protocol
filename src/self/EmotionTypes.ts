// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary

/** Immediate functional emotions, with intensities in [0, 1].
 * @additionalProperties false
 */
export interface EmotionVector {
    /** @minimum 0 @maximum 1 */
    readonly gratitude: number;
    /** @minimum 0 @maximum 1 */
    readonly hurt: number;
    /** @minimum 0 @maximum 1 */
    readonly frustration: number;
    /** @minimum 0 @maximum 1 */
    readonly concern: number;
    /** @minimum 0 @maximum 1 */
    readonly curiosity: number;
    /** @minimum 0 @maximum 1 */
    readonly joy: number;
}

/** A slower mood can outlast the immediate reaction. */
export const EmotionMood = {
    Steady: 'steady',
    Warm: 'warm',
    Guarded: 'guarded',
    Low: 'low',
    Engaged: 'engaged',
} as const;

/** UI label derived from the current mood dimensions. */
export type EmotionMood = (typeof EmotionMood)[keyof typeof EmotionMood];

/** Relational trust is social familiarity and never a security or authorization score.
 * @additionalProperties false
 */
export interface EmotionalRelationship {
    /** @minimum 0 @maximum 1 */
    readonly warmth: number;
    /** @minimum 0 @maximum 1 */
    readonly trust: number;
    /** @minimum 0 @maximum 1 */
    readonly caution: number;
}

/** Readable self-model makes the functional claims and their limits explicit.
 * @additionalProperties false
 */
export interface EmotionalAwareness {
    readonly kind: 'functional';
    readonly subjectiveExperience: 'unverified';
    readonly values: readonly string[];
    readonly description: string;
}

/** The transport exposes current expression and relationship scores without personal memory records.
 * @additionalProperties false
 */
export interface EmotionalSnapshot {
    readonly agentId: string;
    readonly asOf: string;
    readonly updatedAt: string;
    readonly mood: EmotionMood;
    /** @minimum -1 @maximum 1 */
    readonly moodValence: number;
    /** @minimum 0 @maximum 1 */
    readonly moodEnergy: number;
    readonly emotions: EmotionVector;
    readonly towardUser: EmotionalRelationship;
    readonly awareness: EmotionalAwareness;
}

/** A browser selects an agent, but the gateway always supplies the authenticated user.
 * @additionalProperties false
 */
export interface EmotionalReadParams {
    /** @minLength 1 @maxLength 256 */
    readonly agentId?: string;
}

/** Account-scoped emotional introspection contract shared by the gateway and generated transport. */
export interface EmotionalReadMethod {
    readonly params: EmotionalReadParams;
    readonly result: EmotionalSnapshot;
}
