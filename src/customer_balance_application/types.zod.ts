import {z} from 'zod';
import {monetaryAmountSchema} from '../types.zod';

export const billDetailsSchema = z.object({
  total: monetaryAmountSchema,
  customer_balance: monetaryAmountSchema,
});
export const appliedCustomerBalanceResultSchema = z.object({
  applied_customer_balance: monetaryAmountSchema,
});
