# Stripe Scripts SDK

## Development setup

### Prerequisites

- Node.js (v18.14.0 or higher)
- npm (v9.3.1 or higher)

### Installation

```bash
npm install @stripe/scripts
```

## Authoring scripts
Here is an example script:
```ts
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
    line_item_discounts: [],
  };
};

export default percentOffUptoMaxDiscount;
```

You can explore [the examples package](https://github.com/stripe/scripts/tree/master/examples) for more example scripts as well as explore how you can set up your custom scripts package.


See the [SDK Documentation](https://docs.corp.stripe.com/billing/subscriptions/script-coupons) for more information on how to use the SDK.


## Packaging

Instructions for how to package and upload your scripts are coming soon!
