// SPDX-License-Identifier: LicenseRef-Proprietary
/** Resolution uses the selected provider only; policies require their own verified resolver. */
export const WorkflowModelSelection = { Exact: 'exact', Latest: 'latest-compatible' };
/** The image operation is part of immutable settings and pricing identity. */
export const WorkflowImageOperation = { Generate: 'generate', Edit: 'edit' };
export const WorkflowRunMode = {
    LiveTest: 'live-test',
    MockTest: 'mock-test',
    Published: 'published',
};
/** Required operation capabilities for the text handler. */
export const WorkflowTextCapability = { Text: 'text', Reasoning: 'reasoning' };
