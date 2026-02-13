import {RouteItemsRequest, RouteItemsResponse} from './types';
import {RunContext} from '../types';

/**
 * This file contains runtime function interfaces for implementing billing scripts.
 */

/**
 * routeItems function
 *
 * @template C - The type of the function configuration
 * @param {RunContext} context - The context of the function
 * @param {C} configuration - Custom configuration data passed to the function
 * @param {RouteItemsRequest} route_items_request - RouteItemsRequest
 * @returns {RouteItemsResponse} - routeItems result
 */
export type RouteItemsFunction<C> = (
  context: RunContext,
  configuration: C,
  route_items_request: RouteItemsRequest,
) => RouteItemsResponse;

/**
 * BillRouting interface
 *
 * @template C - The type of the function configuration
 */
export interface BillRouting<C> {
  routeItems: RouteItemsFunction<C>;
}
