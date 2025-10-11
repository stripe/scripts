import type {
  ComputeDiscountsFunction,
  DiscountableItem,
  DiscountResult,
  DiscountCalculation,
} from '@stripe/scripts/discount_calculation';

import type {RunContext} from '@stripe/scripts';

/**
 * Configuration for the discount calculator function
 */
export type TieredPercentOffDiscountConfiguration = {
  currency: string;
  tier_1_minimum_spend_amount: number;
  tier_1_discount_percent: number;
  tier_2_minimum_spend_amount: number;
  tier_2_discount_percent: number;
};

/**
 * Gives a percentage off based on minimum spend amount.
 * It is assumed tier1 amount < tier2 amount
 *
 * @param {TieredPercentOffDiscountConfiguration} configuration - The config containing tier specifications
 * @param {DiscountableItem} item - The items to apply discounts to
 * @returns {DiscountResult} - The discounts applied to the items
 */
const tieredPercentOffDiscountCalculator: ComputeDiscountsFunction<
  TieredPercentOffDiscountConfiguration
> = (
  context: RunContext,
  configuration: TieredPercentOffDiscountConfiguration,
  discountable_item: DiscountableItem,
): DiscountResult => {
  const {
    currency,
    tier_1_minimum_spend_amount,
    tier_1_discount_percent,
    tier_2_minimum_spend_amount,
    tier_2_discount_percent,
  } = configuration;
  let discountAmount = 0;
  let discountPercent = 0;

  const invoiceTotal = discountable_item.gross_amount.amount;

  if (
    discountable_item.gross_amount.currency.toLowerCase().trim() ===
    currency.toLowerCase().trim()
  ) {
    // Get discount percent based on gross amount
    switch (true) {
      case invoiceTotal >= tier_2_minimum_spend_amount:
        discountPercent = tier_2_discount_percent;
        break;
      case invoiceTotal >= tier_1_minimum_spend_amount:
        discountPercent = tier_1_discount_percent;
        break;
      default:
        break;
    }

    discountAmount = (invoiceTotal * discountPercent) / 100;
  }

  return {
    discount: {
      amount: {
        amount: discountAmount,
        currency: discountable_item.gross_amount.currency,
      },
    },
  };
};

const computeTieredPercentOffDiscountCalculator: DiscountCalculation<TieredPercentOffDiscountConfiguration> =
  {
    computeDiscounts: tieredPercentOffDiscountCalculator,
  };

export default computeTieredPercentOffDiscountCalculator;
