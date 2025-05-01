import type {DiscountableLineItem} from '@stripe/scripts/discount_calculation';
import tieredPercentOffDiscountCalculator from './index';

describe('tieredPercentOffDiscountCalculator', () => {
  const configuration = {
    currency: 'usd',
    tier_1_minimum_spend_amount: 100,
    tier_1_discount_percent: 10,
    tier_2_minimum_spend_amount: 200,
    tier_2_discount_percent: 20,
  };

  const createDiscountableItemWithAmount = (amount: number) => {
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount, currency: 'usd'},
        price_id: 'price1',
        is_free_trial: false,
        is_recurring: false,
        quantity: 1,
        unit_amount: {amount, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    return {
      gross_amount: {amount, currency: 'usd'},
      line_items: discountableLineItems,
    };
  };

  it('should apply 0 when you spend less than tier 1 minimum', () => {
    const discountableItem = createDiscountableItemWithAmount(50);

    const result = tieredPercentOffDiscountCalculator(
      configuration,
      discountableItem,
    );

    expect(result).toEqual({
      discount: {
        amount: {amount: 0, currency: 'usd'},
      },
    });
  });

  it('should apply 0 when line items are missing', () => {
    const discountableItem = {
      gross_amount: {amount: 0, currency: 'usd'},
      line_items: [],
    };

    const result = tieredPercentOffDiscountCalculator(
      configuration,
      discountableItem,
    );

    expect(result).toEqual({
      discount: {
        amount: {amount: 0, currency: 'usd'},
      },
    });
  });

  it('should apply 10% when you spend between tier 1 and tier 2 minimum', () => {
    const discountableItem = createDiscountableItemWithAmount(150);
    const result = tieredPercentOffDiscountCalculator(
      configuration,
      discountableItem,
    );

    expect(result).toEqual({
      discount: {
        amount: {amount: 15, currency: 'usd'},
      },
    });
  });

  it('should apply 20% when you spend above tier 2', () => {
    const discountableItem = createDiscountableItemWithAmount(250);
    const result = tieredPercentOffDiscountCalculator(
      configuration,
      discountableItem,
    );

    expect(result).toEqual({
      discount: {
        amount: {amount: 50, currency: 'usd'},
      },
    });
  });

  it('should not apply discount when there is a currency mismatch', () => {
    const discountableItem = createDiscountableItemWithAmount(400);
    const cadConfiguration = {
      ...configuration,
      currency: 'cad',
    };
    const result = tieredPercentOffDiscountCalculator(
      cadConfiguration,
      discountableItem,
    );

    expect(result).toEqual({
      discount: {
        amount: {amount: 0, currency: 'usd'},
      },
    });
  });

  it('should apply discount when currency capitalization is different', () => {
    const discountableItem = createDiscountableItemWithAmount(400);
    const usdConfiguration = {
      ...configuration,
      currency: 'USD',
    };
    const result = tieredPercentOffDiscountCalculator(
      usdConfiguration,
      discountableItem,
    );

    expect(result).toEqual({
      discount: {
        amount: {amount: 80, currency: 'usd'},
      },
    });
  });
});
