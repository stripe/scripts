import {z} from 'zod';
import {metadataSchema, timeRangeSchema} from '../types.zod';

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
export const proratableItemSchema = z.object({
  key: z.string(),
  type: itemTypeSchema,
  price: priceSchema,
  is_proration: z.boolean(),
  service_period: timeRangeSchema,
  current_proration_factor: z.number(),
  price_interval_duration: z.number(),
});
export const itemWithProrationSchema = z.object({
  key: z.string(),
  proration_factor: z.number(),
  line_item_period: timeRangeSchema,
});
export const prorateItemsRequestSchema = z.object({
  items: z.array(proratableItemSchema),
});
export const prorateItemsResponseSchema = z.object({
  items: z.array(itemWithProrationSchema),
});
