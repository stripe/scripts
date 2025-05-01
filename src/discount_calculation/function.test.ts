import {MonetaryAmount} from '../types';
import {DiscountableItem, DiscountableLineItem} from './types';
import {DiscountCalculationFunction} from './function';

describe('percentageDiscountCalculator', () => {
  type PercentageDiscountContext = {
    discountPercentage: number;
    maxDiscountAmount: MonetaryAmount;
  };

  const percentageDiscountCalculator: DiscountCalculationFunction<
    PercentageDiscountContext
  > = (configuration, discountableItem) => {
    // Initialize the result with line item discounts array
    const result = {
      discount: {
        amount: {amount: 0, currency: discountableItem.gross_amount.currency},
      },
    };

    // Check if line_items exist
    if (
      !discountableItem.line_items ||
      discountableItem.line_items.length === 0
    ) {
      return result;
    }

    let totalDiscountAmount = 0;

    // Calculate discount for each line item
    discountableItem.line_items.forEach((lineItem) => {
      // Calculate the discount amount based on the percentage
      const lineItemDiscountAmount =
        (lineItem.subtotal.amount * configuration.discountPercentage) / 100;

      // Add to the total discount
      totalDiscountAmount += lineItemDiscountAmount;
    });

    // Apply the max discount cap to the total if needed
    const finalTotalDiscount = Math.min(
      totalDiscountAmount,
      configuration.maxDiscountAmount.amount,
    );

    // Set the total discount amount
    result.discount.amount.amount = finalTotalDiscount;

    return result;
  };

  const configuration: PercentageDiscountContext = {
    discountPercentage: 20,
    maxDiscountAmount: {amount: 100, currency: 'usd'},
  };

  const discountableItems: Array<DiscountableLineItem> = [
    {
      subtotal: {amount: 200, currency: 'usd'},
      price_id: 'price_1',
      is_free_trial: false,
      is_recurring: true,
      quantity: 1,
      unit_amount: {amount: 200, currency: 'usd'},
      period: {
        type: 'time_range',
        start_date: new Date('2023-01-01T00:00:00Z'),
        end_date: new Date('2023-12-31T23:59:59Z'),
      },
    },
    {
      subtotal: {amount: 1000, currency: 'usd'},
      price_id: 'price_2',
      is_free_trial: false,
      is_recurring: true,
      quantity: 1,
      unit_amount: {amount: 1000, currency: 'usd'},
      period: {
        type: 'time_range',
        start_date: new Date('2023-01-01T00:00:00Z'),
        end_date: new Date('2023-12-31T23:59:59Z'),
      },
    },
  ];
  const discountableItem: DiscountableItem = {
    gross_amount: {amount: 1200, currency: 'usd'},
    line_items: discountableItems,
  };

  it('applies percentage discount with max cap', () => {
    const result = percentageDiscountCalculator(
      configuration,
      discountableItem,
    );

    expect(result).toEqual({
      discount: {
        amount: {amount: 100, currency: 'usd'},
      },
    });
  });
});
