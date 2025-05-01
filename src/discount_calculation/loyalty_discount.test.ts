import {DiscountableItem, DiscountableLineItem} from './types';
import {
  loyaltyDiscountCalculator,
  LoyaltyDiscountContext,
  LoyaltyStatus,
} from './loyalty_discount';

describe('loyaltyDiscountCalculator', () => {
  // Create test data
  const discountableItem: DiscountableItem = {
    gross_amount: {amount: 1000, currency: 'usd'},
    line_items: [],
  };

  it('applies 30% discount for PLATINUM status', () => {
    const configuration: LoyaltyDiscountContext = {
      loyaltyStatus: 'PLATINUM',
    };

    const result = loyaltyDiscountCalculator(configuration, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 300, currency: 'usd'},
      },
    });
  });

  it('applies 20% discount for GOLD status', () => {
    const configuration: LoyaltyDiscountContext = {
      loyaltyStatus: 'GOLD',
    };

    const result = loyaltyDiscountCalculator(configuration, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 200, currency: 'usd'},
      },
    });
  });

  it('applies 10% discount for SILVER status', () => {
    const configuration: LoyaltyDiscountContext = {
      loyaltyStatus: 'SILVER',
    };

    const result = loyaltyDiscountCalculator(configuration, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 100, currency: 'usd'},
      },
    });
  });

  it('handles non-standard loyalty status with 0% discount', () => {
    const configuration = {
      loyaltyStatus: 'BRONZE' as LoyaltyStatus,
    };

    const result = loyaltyDiscountCalculator(configuration, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 0, currency: 'usd'},
      },
    });
  });

  it('calculates discount based on gross amount only, ignoring line items', () => {
    // Define line items
    const lineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price_1',
        is_free_trial: false,
        is_recurring: true,
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
      {
        subtotal: {amount: 700, currency: 'usd'},
        price_id: 'price_2',
        is_free_trial: false,
        is_recurring: true,
        quantity: 1,
        unit_amount: {amount: 700, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    // Create a discountable item with line items and gross amount
    const discountableItemWithLineItems: DiscountableItem = {
      gross_amount: {amount: 1500, currency: 'usd'}, // Note: Different from sum of line items
      line_items: lineItems,
    };

    const configuration: LoyaltyDiscountContext = {
      loyaltyStatus: 'PLATINUM',
    };

    const result = loyaltyDiscountCalculator(
      configuration,
      discountableItemWithLineItems,
    );

    // Should calculate 30% of gross_amount (1500), not the sum of line items (1000)
    expect(result).toEqual({
      discount: {
        amount: {amount: 450, currency: 'usd'},
      },
    });
  });
});
