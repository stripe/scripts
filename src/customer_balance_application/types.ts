import {MonetaryAmount} from '../types';

/**
 * BillDetails data structure
 *
 * @typedef {Object} BillDetails
 * @property {MonetaryAmount} total
 * @property {MonetaryAmount} customer_balance
 */
export interface BillDetails {
  total: MonetaryAmount;
  customer_balance: MonetaryAmount;
}

/**
 * AppliedCustomerBalanceResult data structure
 *
 * @typedef {Object} AppliedCustomerBalanceResult
 * @property {MonetaryAmount} applied_customer_balance
 */
export interface AppliedCustomerBalanceResult {
  applied_customer_balance: MonetaryAmount;
}
