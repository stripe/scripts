import type {DiscountableLineItem} from '@stripe/scripts/discount_calculation';
import discountCalculatorFunction from './index';

describe('discountCalculatorFunction', () => {
  it('should apply the correct discount when discount amount is less than max discount amount', () => {
    const config = {
      max_discount_amount: {amount: 50, currency: 'usd'},
      discount_percent: 10,
    };
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price1',
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    const discountableItem = {
      gross_amount: {amount: 300, currency: 'usd'},
      line_items: discountableLineItems,
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 30, currency: 'usd'},
      },
    });
  });

  it('should apply the max discount amount when discount amount exceeds max discount amount', () => {
    const config = {
      max_discount_amount: {amount: 20, currency: 'usd'},
      discount_percent: 10,
    };
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price1',
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    const discountableItem = {
      gross_amount: {amount: 300, currency: 'usd'},
      line_items: discountableLineItems,
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 20, currency: 'usd'},
      },
    });
  });

  it('should not apply any discount when discount percent is 0', () => {
    const config = {
      max_discount_amount: {amount: 50, currency: 'usd'},
      discount_percent: 0,
    };
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price1',
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    const discountableItem = {
      gross_amount: {amount: 300, currency: 'usd'},
      line_items: discountableLineItems,
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 0, currency: 'usd'},
      },
    });
  });

  it('should apply discount to multiple items correctly for percentage discount', () => {
    const config = {
      max_discount_amount: {amount: 50, currency: 'usd'},
      discount_percent: 10,
    };
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price1',
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
      {
        subtotal: {amount: 100, currency: 'usd'},
        price_id: 'price2',
        quantity: 1,
        unit_amount: {amount: 100, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    const discountableItem = {
      gross_amount: {amount: 400, currency: 'usd'},
      line_items: discountableLineItems,
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 40, currency: 'usd'},
      },
    });
  });

  it('should apply discount to multiple items correctly for max discount', () => {
    const config = {
      max_discount_amount: {amount: 35, currency: 'usd'},
      discount_percent: 10,
    };
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price1',
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
      {
        subtotal: {amount: 100, currency: 'usd'},
        price_id: 'price2',
        quantity: 1,
        unit_amount: {amount: 100, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    const discountableItem = {
      gross_amount: {amount: 400, currency: 'usd'},
      line_items: discountableLineItems,
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 35, currency: 'usd'},
      },
    });
  });

  it('should not apply any discount when the currency is a mismatch', () => {
    const config = {
      max_discount_amount: {amount: 50, currency: 'cad'},
      discount_percent: 20,
    };
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price1',
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    const discountableItem = {
      gross_amount: {amount: 300, currency: 'usd'},
      line_items: discountableLineItems,
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 0, currency: 'usd'},
      },
    });
  });

  it('should apply discount when the currency capitalization is a mismatch', () => {
    const config = {
      max_discount_amount: {amount: 50, currency: 'USD'},
      discount_percent: 20,
    };
    const discountableLineItems: Array<DiscountableLineItem> = [
      {
        subtotal: {amount: 300, currency: 'usd'},
        price_id: 'price1',
        quantity: 1,
        unit_amount: {amount: 300, currency: 'usd'},
        period: {
          type: 'time_range',
          start_date: new Date('2023-01-01T00:00:00Z'),
          end_date: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ];

    const discountableItem = {
      gross_amount: {amount: 300, currency: 'usd'},
      line_items: discountableLineItems,
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 50, currency: 'usd'},
      },
    });
  });

  it('should not apply any discount when the invoice amount is 0', () => {
    const config = {
      max_discount_amount: {amount: 50, currency: 'usd'},
      discount_percent: 20,
    };

    const discountableItem = {
      gross_amount: {amount: 0, currency: 'usd'},
      line_items: [],
    };

    const result = discountCalculatorFunction(config, discountableItem);

    expect(result).toEqual({
      discount: {
        amount: {amount: 0, currency: 'usd'},
      },
    });
  });
});
