// SPDX-FileCopyrightText: 2026 Dacely <business@dacely.com>
// SPDX-License-Identifier: LicenseRef-Proprietary
import { PricingBasis } from '../../credit/PricingBasis.js';
/** Legacy reporting never infers a pricing classification from its amount. */
export const WorkflowSpendingBasis = { ...PricingBasis, Legacy: 'legacy' };
