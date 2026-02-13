import {ProrateItemsRequest, ProrateItemsResponse} from './types';
import {RunContext} from '../types';

/**
 * This file contains runtime function interfaces for implementing billing scripts.
 */

/**
 * prorateItems function
 *
 * @template C - The type of the function configuration
 * @param {RunContext} context - The context of the function
 * @param {C} configuration - Custom configuration data passed to the function
 * @param {ProrateItemsRequest} prorate_items_request - ProrateItemsRequest
 * @returns {ProrateItemsResponse} - prorateItems result
 */
export type ProrateItemsFunction<C> = (
  context: RunContext,
  configuration: C,
  prorate_items_request: ProrateItemsRequest,
) => ProrateItemsResponse;

/**
 * Prorations interface
 *
 * @template C - The type of the function configuration
 */
export interface Prorations<C> {
  prorateItems: ProrateItemsFunction<C>;
}
