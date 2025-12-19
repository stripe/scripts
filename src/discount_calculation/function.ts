import {DiscountableItem, DiscountResult} from './types';
import {RunContext} from '../types';

/**
 * This file contains runtime function interfaces for implementing billing scripts.
 */

/**
 * computeDiscounts function
 *
 * @template C - The type of the function configuration
 * @param {RunContext} context - The context of the function
 * @param {C} configuration - Custom configuration data passed to the function
 * @param {DiscountableItem} discountable_item - discountable_item
 * @returns {DiscountResult} - computeDiscounts result
 */
export type ComputeDiscountsFunction<C> = (
  context: RunContext,
  configuration: C,
  discountable_item: DiscountableItem,
) => DiscountResult;

/**
 * DiscountCalculation interface
 *
 * @template C - The type of the function configuration
 */
export interface DiscountCalculation<C> {
  computeDiscounts: ComputeDiscountsFunction<C>;
}
