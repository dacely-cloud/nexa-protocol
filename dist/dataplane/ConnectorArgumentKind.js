// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Public input rules exclude private executable paths and positional fixed arguments. */
export const ConnectorArgumentKind = {
    Choice: 'choice',
    Text: 'text',
    RelativePath: 'relative-path',
    MachineInvocation: 'machine-invocation',
    InteractiveInvocation: 'interactive-invocation',
};
