import type { RobloxInputRequest } from './RobloxSceneTypes.js';
/** A logical activation on the retained VM's current clock. */
export interface RobloxLiveActivation extends Omit<RobloxInputRequest, 'at'> {
}
