import type {
  DiscountCalculationFunction,
  DiscountableItem,
  DiscountResult,
} from '@stripe/scripts/discount_calculation';

import type {PositiveMonetaryAmount, Percent} from '@stripe/scripts';

/**
 * Configuration for the discount calculator function
 */
export type DiscountCalculatorConfiguration = {
  max_discount_amount: PositiveMonetaryAmount;
  discount_percent: Percent;
};

/**
 * Gives a percentage off discount upto a maximum discount amount
 *
 * @param {DiscountCalculatorConfiguration} config - The configuration containing max discount amount and discount percent
 * @param {DiscountableItem} item - The items to apply discounts to
 * @returns {DiscountResult} - The discounts applied to the items
 */
const percentOffUptoMaxDiscount: DiscountCalculationFunction<
  DiscountCalculatorConfiguration
> = (
  config: DiscountCalculatorConfiguration,
  item: DiscountableItem,
): DiscountResult => {
  const {max_discount_amount, discount_percent} = config;
  let discountAmount = 0;

  if (
    item.gross_amount.currency.toLowerCase().trim() ===
    max_discount_amount.currency.toLowerCase().trim()
  ) {
    const discountAmountValue =
      (item.gross_amount.amount * discount_percent) / 100;
    discountAmount = Math.min(discountAmountValue, max_discount_amount.amount);
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

export default percentOffUptoMaxDiscount;
