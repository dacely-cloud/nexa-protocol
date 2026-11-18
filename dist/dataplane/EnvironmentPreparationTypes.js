// SPDX-FileCopyrightText: 2026 Nexa contributors
// SPDX-License-Identifier: LicenseRef-Proprietary
/** Tooling readiness is separate from fleet security qualification. */
export var EnvironmentPreparationState;
(function (EnvironmentPreparationState) {
    EnvironmentPreparationState["Preparing"] = "preparing";
    EnvironmentPreparationState["Ready"] = "ready";
    EnvironmentPreparationState["Failed"] = "failed";
    EnvironmentPreparationState["Interrupted"] = "interrupted";
})(EnvironmentPreparationState || (EnvironmentPreparationState = {}));
