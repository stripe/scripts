import type {
  DiscountCalculationFunction,
  DiscountableItem,
  DiscountResult,
} from '@stripe/scripts/discount_calculation';

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
const tieredPercentOffDiscountCalculator: DiscountCalculationFunction<
  TieredPercentOffDiscountConfiguration
> = (
  configuration: TieredPercentOffDiscountConfiguration,
  item: DiscountableItem,
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

  const invoiceTotal = item.gross_amount.amount;

  if (
    item.gross_amount.currency.toLowerCase().trim() ===
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
        currency: item.gross_amount.currency,
      },
    },
  };
};

export default tieredPercentOffDiscountCalculator;
