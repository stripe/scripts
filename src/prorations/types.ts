import {Metadata, TimeRange} from '../types';

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
 * PricingScheme enum
 * @typedef {('PER_UNIT'|'TIERED')} PricingScheme
 */
export type PricingScheme = 'PER_UNIT' | 'TIERED';

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
 * @property {Metadata} metadata
 * @property {Product | null} product
 * @property {RecurringPrice | null} recurring
 * @property {PricingScheme | null} billing_scheme
 * @property {Array<PriceTier> | null} tiers
 * @property {PriceType | null} type
 * @property {PricingTierMode | null} tiers_mode
 * @property {number | null} unit_amount
 */
export interface Price {
  id: string;
  metadata: Metadata;
  product?: Product | null;
  recurring?: RecurringPrice | null;
  billing_scheme?: PricingScheme | null;
  tiers?: Array<PriceTier> | null;
  type?: PriceType | null;
  tiers_mode?: PricingTierMode | null;
  unit_amount?: number | null;
}
/**
 * ItemType enum
 * @typedef {('CREDIT'|'DEBIT')} ItemType
 */
export type ItemType = 'CREDIT' | 'DEBIT';

/**
 * ProratableItem data structure
 *
 * @typedef {Object} ProratableItem
 * @property {string} key
 * @property {ItemType} type
 * @property {Price} price
 * @property {boolean} is_proration
 * @property {TimeRange} service_period
 * @property {number} current_proration_factor
 * @property {number} price_interval_duration
 */
export interface ProratableItem {
  key: string;
  type: ItemType;
  price: Price;
  is_proration: boolean;
  service_period: TimeRange;
  current_proration_factor: number;
  price_interval_duration: number;
}

/**
 * ItemWithProration data structure
 *
 * @typedef {Object} ItemWithProration
 * @property {string} key
 * @property {number} proration_factor
 * @property {TimeRange} line_item_period
 */
export interface ItemWithProration {
  key: string;
  proration_factor: number;
  line_item_period: TimeRange;
}

/**
 * ProrateItemsRequest data structure
 *
 * @typedef {Object} ProrateItemsRequest
 * @property {Array<ProratableItem>} items
 */
export interface ProrateItemsRequest {
  items: Array<ProratableItem>;
}

/**
 * ProrateItemsResponse data structure
 *
 * @typedef {Object} ProrateItemsResponse
 * @property {Array<ItemWithProration>} items
 */
export interface ProrateItemsResponse {
  items: Array<ItemWithProration>;
}
