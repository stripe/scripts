import {BillDetails, AppliedCustomerBalanceResult} from './types';
import {RunContext} from '../types';

/**
 * This file contains runtime function interfaces for implementing billing scripts.
 */

/**
 * computeAppliedCustomerBalance function
 *
 * @template C - The type of the function configuration
 * @param {RunContext} context - The context of the function
 * @param {C} configuration - Custom configuration data passed to the function
 * @param {BillDetails} bill_details - bill_details
 * @returns {AppliedCustomerBalanceResult} - computeAppliedCustomerBalance result
 */
export type ComputeAppliedCustomerBalanceFunction<C> = (
  context: RunContext,
  configuration: C,
  bill_details: BillDetails,
) => AppliedCustomerBalanceResult;

/**
 * CustomerBalanceApplication interface
 *
 * @template C - The type of the function configuration
 */
export interface CustomerBalanceApplication<C> {
  computeAppliedCustomerBalance: ComputeAppliedCustomerBalanceFunction<C>;
}
