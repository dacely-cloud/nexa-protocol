import type { AgileDesign } from './AgileDesign.js';
/** Sprint transitions are checked against the actual task graph before persistence. */
export declare const AgileSprintStatus: {
    readonly Planned: 'planned';
    readonly Active: 'active';
    readonly Review: 'review';
    readonly Complete: 'complete';
};
/** Persisted sprint lifecycle. */
export type AgileSprintStatus = (typeof AgileSprintStatus)[keyof typeof AgileSprintStatus];
/** A short planning question and its answer; sources are references, never authorization. */
export interface AgileDecision {
    readonly id: string;
    readonly question: string;
    readonly answer: string;
    readonly sources: readonly string[];
}
/** A product outcome containing stories, with explicit dependencies on other epics. */
export interface AgileEpic {
    readonly id: string;
    readonly title: string;
    readonly outcome: string;
    readonly dependsOn: readonly string[];
}
/** A user-visible behavior delivered in one sprint and linked to the plan's acceptance indices. */
export interface AgileStory {
    readonly id: string;
    readonly epicId: string;
    readonly sprintId: string;
    readonly title: string;
    readonly userStory: string;
    readonly criteria: readonly number[];
    readonly acceptance: readonly string[];
    readonly dependsOn: readonly string[];
}
/** A bounded increment; completion requires settled tasks and a recorded review. */
export interface AgileSprint {
    readonly id: string;
    readonly title: string;
    readonly goal: string;
    readonly dependsOn: readonly string[];
    readonly status: AgileSprintStatus;
    readonly review: string | null;
}
/** Binds one durable execution step to a story without duplicating its status or worker owner. */
export interface AgileTask {
    readonly stepId: string;
    readonly storyId: string;
    readonly acceptance: readonly string[];
}
/** Agile structure attached atomically to the existing durable plan and its execution steps. */
export interface AgilePlan {
    readonly version: 1;
    /** Bounded soft quality target in seconds, not a deadline or permission to omit requirements. */
    readonly qualitySeconds: number;
    readonly intent: readonly string[];
    readonly assumptions: readonly string[];
    readonly decisions: readonly AgileDecision[];
    readonly epics: readonly AgileEpic[];
    readonly stories: readonly AgileStory[];
    readonly sprints: readonly AgileSprint[];
    readonly tasks: readonly AgileTask[];
    /** Required for new proposals; older saved plans remain readable without fabricated design. */
    readonly design?: AgileDesign;
}
