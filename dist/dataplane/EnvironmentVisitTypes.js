// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
/**
 * A passive visit never claims native, SSH, or tooling readiness.
 *
 * @remarks
 * `SetupRequired` is also the answer for an account without a current paid plan, so the website
 * opens VM setup, whose terminal state names the plan requirement, instead of waking anything.
 */
export var EnvironmentVisitState;
(function (EnvironmentVisitState) {
    EnvironmentVisitState["SetupRequired"] = "setup-required";
    EnvironmentVisitState["Existing"] = "existing";
})(EnvironmentVisitState || (EnvironmentVisitState = {}));
