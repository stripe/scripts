import {DiscountCalculationFunction} from './function';
import {DiscountResult} from './types';

// Define the loyalty statuses
export type LoyaltyStatus = 'PLATINUM' | 'GOLD' | 'SILVER';

// Define the configuration type for the loyalty discount calculator
export type LoyaltyDiscountContext = {
  loyaltyStatus: LoyaltyStatus;
};

/**
 * Loyalty discount calculator that applies different discount percentages based on loyalty status
 * - PLATINUM: 30% discount
 * - GOLD: 20% discount
 * - SILVER: 10% discount
 *
 * The discount is calculated based on the gross amount of the discountable item.
 *
 * @param configuration - The loyalty configuration with status
 * @param discountableItem - The item to apply the discount to
 * @returns The discount result with the calculated amount
 */
export const loyaltyDiscountCalculator: DiscountCalculationFunction<
  LoyaltyDiscountContext
> = (configuration, discountableItem): DiscountResult => {
  // Initialize the result with discount amount
  const result = {
    discount: {
      amount: {amount: 0, currency: discountableItem.gross_amount.currency},
    },
  };

  // Determine discount percentage based on loyalty status
  let discountPercentage = 0;
  switch (configuration.loyaltyStatus) {
    case 'PLATINUM':
      discountPercentage = 30;
      break;
    case 'GOLD':
      discountPercentage = 20;
      break;
    case 'SILVER':
      discountPercentage = 10;
      break;
    default:
      discountPercentage = 0;
  }

  // Calculate the discount amount based on the gross amount
  const discountAmount =
    (discountableItem.gross_amount.amount * discountPercentage) / 100;

  // Set the discount amount
  result.discount.amount.amount = discountAmount;

  return result;
};
