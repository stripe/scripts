import {TimeRange, MonetaryAmount} from './types';

describe('TimeRange', () => {
  it('creates a valid one time time range', () => {
    const timeRange: TimeRange = {
      type: 'one_time',
      at: new Date('2023-01-01T00:00:00Z'),
    };

    expect(timeRange.at).toBeInstanceOf(Date);
    expect(timeRange.type).toBe('one_time');
  });
});

it('creates a valid time range', () => {
  const timeRange: TimeRange = {
    type: 'time_range',
    start_date: new Date('2023-01-01T00:00:00Z'),
    end_date: new Date('2023-12-31T23:59:59Z'),
  };

  expect(timeRange.start_date).toBeInstanceOf(Date);
  expect(timeRange.end_date).toBeInstanceOf(Date);
  expect(timeRange.type).toBe('time_range');
});

describe('MonetaryAmount', () => {
  it('creates a valid monetary amount', () => {
    const money: MonetaryAmount = {
      amount: 1000,
      currency: 'USD',
    };

    expect(typeof money.amount).toBe('number');
    expect(typeof money.currency).toBe('string');
    expect(money.amount).toBe(1000);
    expect(money.currency).toBe('USD');
  });

  it('handles zero amounts', () => {
    const zeroMoney: MonetaryAmount = {
      amount: 0,
      currency: 'EUR',
    };

    expect(zeroMoney.amount).toBe(0);
    expect(zeroMoney.currency).toBe('EUR');
  });
});
