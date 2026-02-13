import {z} from 'zod';
import {metadataSchema, anyTimeRangeSchema} from '../types.zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  metadata: metadataSchema,
});
export const recurringPriceIntervalSchema = z.union([
  z.literal('DAY'),
  z.literal('WEEK'),
  z.literal('MONTH'),
  z.literal('YEAR'),
]);
export const usageTypeSchema = z.union([
  z.literal('LICENSED'),
  z.literal('METERED'),
]);
export const recurringPriceSchema = z.object({
  interval: recurringPriceIntervalSchema,
  interval_count: z.number(),
  usage_type: usageTypeSchema.optional(),
  meter: z.string().optional(),
});
export const pricingSchemeSchema = z.union([
  z.literal('PER_UNIT'),
  z.literal('TIERED'),
]);
export const priceTierSchema = z.object({
  flat_amount: z.number().optional(),
  unit_amount: z.number().optional(),
  up_to: z.number().optional(),
});
export const priceTypeSchema = z.union([
  z.literal('ONE_TIME'),
  z.literal('RECURRING'),
]);
export const pricingTierModeSchema = z.union([
  z.literal('GRADUATED'),
  z.literal('VOLUME'),
]);
export const priceSchema = z.object({
  id: z.string(),
  metadata: metadataSchema,
  product: productSchema.optional(),
  recurring: recurringPriceSchema.optional(),
  billing_scheme: pricingSchemeSchema.optional(),
  tiers: z.array(priceTierSchema).optional(),
  type: priceTypeSchema.optional(),
  tiers_mode: pricingTierModeSchema.optional(),
  unit_amount: z.number().optional(),
});
export const itemTypeSchema = z.union([
  z.literal('CREDIT'),
  z.literal('DEBIT'),
]);
export const routableItemSchema = z.object({
  key: z.string(),
  type: itemTypeSchema,
  price: priceSchema,
  is_proration: z.boolean(),
  service_period: anyTimeRangeSchema,
});
export const secondaryBillRoutingDecisionSchema = z.object({
  key: z.string(),
});
export const routingDecisionTypeSchema = z.union([
  z.literal('DO_NOT_BILL'),
  z.literal('PRIMARY_BILL'),
  z.literal('SECONDARY_BILL'),
  z.literal('FUTURE_BILL'),
  z.literal('CREDIT_NOTE'),
]);
export const routingDecisionSchema = z.object({
  type: routingDecisionTypeSchema,
  secondary_bill: secondaryBillRoutingDecisionSchema.optional(),
});
export const itemWithRoutingSchema = z.object({
  key: z.string(),
  routing_decision: routingDecisionSchema,
});
export const routeItemsRequestSchema = z.object({
  items: z.array(routableItemSchema),
});
export const routeItemsResponseSchema = z.object({
  items: z.array(itemWithRoutingSchema),
});
