# Stripe Scripts SDK

## Development setup

### Prerequisites

- Node.js (v18.14.0 or higher)
- npm (v9.3.1 or higher)

### Getting Started

In your project directory, run the following command to install the SDK:

```bash
npm install @stripe/scripts
```

Import the proper script function signature types into your file and write your custom logic inside of your script function.


See the [Stripe Scripts documentation](https://docs.stripe.com/billing/subscriptions/script-coupons#authoring-script-coupon) for more information on how to get started with using the SDK.

## Authoring scripts
Here is an example script authored by Stripe:

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
  };
};

export default percentOffUptoMaxDiscount;

```

You can explore [more examples](https://github.com/stripe/scripts/tree/master/examples) and explore how to write your custom scripts package.

## Packaging

Instructions for how to package and upload your scripts are coming soon!
