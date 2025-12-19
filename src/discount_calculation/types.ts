import {Metadata, MonetaryAmount, AnyTimeRange} from '../types';

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
 * @property {number | null} billing_cycle_anchor
 * @property {BillingCycleAnchorConfig | null} billing_cycle_anchor_config
 * @property {Metadata} metadata
 */
export interface Subscription {
  id: string;
  billing_cycle_anchor?: number | null;
  billing_cycle_anchor_config?: BillingCycleAnchorConfig | null;
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
 * PricingScheme enum
 * @typedef {('PER_UNIT'|'TIERED')} PricingScheme
 */
export type PricingScheme = 'PER_UNIT' | 'TIERED';
/**
 * PriceType enum
 * @typedef {('ONE_TIME'|'RECURRING')} PriceType
 */
export type PriceType = 'ONE_TIME' | 'RECURRING';
/**
 * PricingTierMode enum
 * @typedef {('GRADUATED'|'VOLUME')} PricingTierMode
 */
export type PricingTierMode = 'GRADUATED' | 'VOLUME';

/**
 * Price data structure
 *
 * @typedef {Object} Price
 * @property {string} id
 * @property {Product | null} product
 * @property {RecurringPrice | null} recurring
 * @property {PricingScheme | null} billing_scheme
 * @property {Array<PriceTier> | null} tiers
 * @property {PriceType | null} type
 * @property {PricingTierMode | null} tiers_mode
 * @property {Metadata | null} metadata
 * @property {number | null} unit_amount
 */
export interface Price {
  id: string;
  product?: Product | null;
  recurring?: RecurringPrice | null;
  billing_scheme?: PricingScheme | null;
  tiers?: Array<PriceTier> | null;
  type?: PriceType | null;
  tiers_mode?: PricingTierMode | null;
  metadata?: Metadata | null;
  unit_amount?: number | null;
}

/**
 * DiscountableLineItem data structure
 *
 * @typedef {Object} DiscountableLineItem
 * @property {MonetaryAmount} subtotal
 * @property {number | null} quantity
 * @property {AnyTimeRange} period
 * @property {Price | null} price
 */
export interface DiscountableLineItem {
  subtotal: MonetaryAmount;
  quantity?: number | null;
  period: AnyTimeRange;
  price?: Price | null;
}
/**
 * BillingReason enum
 * @typedef {('AUTOMATIC_PENDING_INVOICE_ITEM_INVOICE'|'MANUAL'|'SUBSCRIPTION'|'SUBSCRIPTION_CREATE'|'SUBSCRIPTION_CYCLE'|'SUBSCRIPTION_CANCEL'|'SUBSCRIPTION_THRESHOLD'|'SUBSCRIPTION_TRIAL_ENDED'|'SUBSCRIPTION_UPDATE'|'UPCOMING'|'QUOTE_ACCEPT')} BillingReason
 */
export type BillingReason = 'AUTOMATIC_PENDING_INVOICE_ITEM_INVOICE' | 'MANUAL' | 'SUBSCRIPTION' | 'SUBSCRIPTION_CREATE' | 'SUBSCRIPTION_CYCLE' | 'SUBSCRIPTION_CANCEL' | 'SUBSCRIPTION_THRESHOLD' | 'SUBSCRIPTION_TRIAL_ENDED' | 'SUBSCRIPTION_UPDATE' | 'UPCOMING' | 'QUOTE_ACCEPT';

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
