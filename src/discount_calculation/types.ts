import {Metadata, TimeRange, MonetaryAmount} from '../types';

/**
 * Warning: This file is generated by the context mapper hooks generator.
 * Any changes to this file will be lost.
 */

/**
 * BillingReason enum
 * @typedef {('MANUAL'|'SUBSCRIPTION_CREATE'|'SUBSCRIPTION_CYCLE'|'SUBSCRIPTION_CANCEL'|'SUBSCRIPTION_THRESHOLD'|'SUBSCRIPTION_TRIAL_ENDED'|'SUBSCRIPTION_UPDATE'|'UPCOMING')} BillingReason
 */
export type BillingReason = 'MANUAL' | 'SUBSCRIPTION_CREATE' | 'SUBSCRIPTION_CYCLE' | 'SUBSCRIPTION_CANCEL' | 'SUBSCRIPTION_THRESHOLD' | 'SUBSCRIPTION_TRIAL_ENDED' | 'SUBSCRIPTION_UPDATE' | 'UPCOMING';
/**
 * RecurringPriceInterval enum
 * @typedef {('DAY'|'WEEK'|'MONTH'|'YEAR')} RecurringPriceInterval
 */
export type RecurringPriceInterval = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
/**
 * UsageType enum
 * @typedef {('LICENSED'|'METERED')} UsageType
 */
export type UsageType = 'LICENSED' | 'METERED';
/**
 * PricingScheme enum
 * @typedef {('PER_UNIT'|'TIERED')} PricingScheme
 */
export type PricingScheme = 'PER_UNIT' | 'TIERED';
/**
 * PricingTierMode enum
 * @typedef {('GRADUATED'|'VOLUME')} PricingTierMode
 */
export type PricingTierMode = 'GRADUATED' | 'VOLUME';
/**
 * PriceType enum
 * @typedef {('ONE_TIME'|'RECURRING')} PriceType
 */
export type PriceType = 'ONE_TIME' | 'RECURRING';

/**
 * Customer data structure
 *
 * @typedef {Object} Customer
 * @property {string} id
 * @property {Metadata} metadata
 */
export interface Customer {
  id: string;
  metadata: Metadata;
}

/**
 * BillingCycleAnchorConfig data structure
 *
 * @typedef {Object} BillingCycleAnchorConfig
 * @property {number} month
 * @property {number} day_of_month
 * @property {number} hour
 * @property {number} minute
 * @property {number} second
 */
export interface BillingCycleAnchorConfig {
  month: number;
  day_of_month: number;
  hour: number;
  minute: number;
  second: number;
}

/**
 * Subscription data structure
 *
 * @typedef {Object} Subscription
 * @property {string} id
 * @property {number} billing_cycle_anchor
 * @property {BillingCycleAnchorConfig} billing_cycle_anchor_config
 * @property {TimeRange} billing_period
 * @property {Metadata} metadata
 */
export interface Subscription {
  id: string;
  billing_cycle_anchor: number;
  billing_cycle_anchor_config: BillingCycleAnchorConfig;
  billing_period: TimeRange;
  metadata: Metadata;
}

/**
 * Product data structure
 *
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {Metadata} metadata
 */
export interface Product {
  id: string;
  name: string;
  metadata: Metadata;
}

/**
 * RecurringPrice data structure
 *
 * @typedef {Object} RecurringPrice
 * @property {RecurringPriceInterval} interval
 * @property {number} interval_count
 * @property {UsageType | null} usage_type
 * @property {string | null} meter
 */
export interface RecurringPrice {
  interval: RecurringPriceInterval;
  interval_count: number;
  usage_type?: UsageType | null;
  meter?: string | null;
}

/**
 * PriceTier data structure
 *
 * @typedef {Object} PriceTier
 * @property {number | null} flat_amount
 * @property {number | null} unit_amount
 * @property {number | null} up_to
 */
export interface PriceTier {
  flat_amount?: number | null;
  unit_amount?: number | null;
  up_to?: number | null;
}

/**
 * Price data structure
 *
 * @typedef {Object} Price
 * @property {string} id
 * @property {Product} product
 * @property {RecurringPrice | null} recurring
 * @property {PricingScheme} billing_scheme
 * @property {Array<PriceTier> | null} tiers
 * @property {PriceType} type
 * @property {PricingTierMode | null} tiers_mode
 * @property {Metadata} metadata
 * @property {number | null} unit_amount
 */
export interface Price {
  id: string;
  product: Product;
  recurring?: RecurringPrice | null;
  billing_scheme: PricingScheme;
  tiers?: Array<PriceTier> | null;
  type: PriceType;
  tiers_mode?: PricingTierMode | null;
  metadata: Metadata;
  unit_amount?: number | null;
}

/**
 * DiscountableLineItem data structure
 *
 * @typedef {Object} DiscountableLineItem
 * @property {MonetaryAmount} subtotal
 * @property {string | null} price_id
 * @property {number | null} quantity
 * @property {MonetaryAmount | null} unit_amount
 * @property {TimeRange} period
 * @property {Price | null} price
 */
export interface DiscountableLineItem {
  subtotal: MonetaryAmount;
  price_id?: string | null;
  quantity?: number | null;
  unit_amount?: MonetaryAmount | null;
  period: TimeRange;
  price?: Price | null;
}

/**
 * DiscountableItem data structure
 *
 * @typedef {Object} DiscountableItem
 * @property {Array<DiscountableLineItem>} line_items
 * @property {MonetaryAmount} gross_amount
 * @property {Customer | null} customer
 * @property {BillingReason | null} billing_reason
 * @property {Subscription | null} subscription
 */
export interface DiscountableItem {
  line_items: Array<DiscountableLineItem>;
  gross_amount: MonetaryAmount;
  customer?: Customer | null;
  billing_reason?: BillingReason | null;
  subscription?: Subscription | null;
}

/**
 * Discount data structure
 *
 * @typedef {Object} Discount
 * @property {MonetaryAmount} amount
 */
export interface Discount {
  amount: MonetaryAmount;
}

/**
 * DiscountResult data structure
 *
 * @typedef {Object} DiscountResult
 * @property {Discount} discount
 */
export interface DiscountResult {
  discount: Discount;
}
