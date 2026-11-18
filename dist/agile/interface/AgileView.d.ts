import type { PlanStatus, PlanStep } from '../../tools/planning/PlanningStateTypes.js';
import type { AgileSprintCommand } from '../AgileSprintTypes.js';
import type { AgilePlan } from './AgilePlan.js';
/** Browser-facing plan fields; execution evidence remains in its own authorized APIs. */
export interface AgileBoardPlan {
    readonly goal: string;
    readonly status: PlanStatus;
    readonly acceptance: readonly string[];
    readonly steps: readonly PlanStep[];
    readonly agile?: AgilePlan;
}
/** Compact effective group edges, including ordering induced by individual tasks. */
export interface AgileViewDependency {
    readonly id: string;
    readonly dependsOn: readonly string[];
}
/** Bounded blocker details do not send the potentially quadratic expanded graph to every browser. */
export interface AgileViewTask {
    readonly id: string;
    readonly ready: boolean;
    readonly blockers: readonly string[];
    readonly blockerCount: number;
}
/** One authoritative revision drives both the board and its dependency graph. */
export interface AgileView {
    readonly version: number;
    readonly paused: boolean;
    readonly plan: AgileBoardPlan | null;
    readonly tasks: readonly AgileViewTask[];
    readonly epics: readonly AgileViewDependency[];
    readonly stories: readonly AgileViewDependency[];
    readonly sprints: readonly AgileViewDependency[];
}
/** A notification invalidates an older view without replaying the complete backlog on each write. */
export interface AgileChanged {
    readonly sessionId: string;
    readonly version: number;
}
/** Session ownership is resolved before the command reaches the planning store. */
export interface AgileSessionCommand {
    readonly sessionId: string;
    readonly command: AgileSprintCommand;
}
