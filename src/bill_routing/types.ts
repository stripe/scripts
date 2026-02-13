import {Metadata, AnyTimeRange} from '../types';

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
 * RoutableItem data structure
 *
 * @typedef {Object} RoutableItem
 * @property {string} key
 * @property {ItemType} type
 * @property {Price} price
 * @property {boolean} is_proration
 * @property {AnyTimeRange} service_period
 */
export interface RoutableItem {
  key: string;
  type: ItemType;
  price: Price;
  is_proration: boolean;
  service_period: AnyTimeRange;
}

/**
 * SecondaryBillRoutingDecision data structure
 *
 * @typedef {Object} SecondaryBillRoutingDecision
 * @property {string} key
 */
export interface SecondaryBillRoutingDecision {
  key: string;
}
/**
 * RoutingDecisionType enum
 * @typedef {('DO_NOT_BILL'|'PRIMARY_BILL'|'SECONDARY_BILL'|'FUTURE_BILL'|'CREDIT_NOTE')} RoutingDecisionType
 */
export type RoutingDecisionType =
  | 'DO_NOT_BILL'
  | 'PRIMARY_BILL'
  | 'SECONDARY_BILL'
  | 'FUTURE_BILL'
  | 'CREDIT_NOTE';

/**
 * RoutingDecision data structure
 *
 * @typedef {Object} RoutingDecision
 * @property {RoutingDecisionType} type
 * @property {SecondaryBillRoutingDecision | null} secondary_bill
 */
export interface RoutingDecision {
  type: RoutingDecisionType;
  secondary_bill?: SecondaryBillRoutingDecision | null;
}

/**
 * ItemWithRouting data structure
 *
 * @typedef {Object} ItemWithRouting
 * @property {string} key
 * @property {RoutingDecision} routing_decision
 */
export interface ItemWithRouting {
  key: string;
  routing_decision: RoutingDecision;
}

/**
 * RouteItemsRequest data structure
 *
 * @typedef {Object} RouteItemsRequest
 * @property {Array<RoutableItem>} items
 */
export interface RouteItemsRequest {
  items: Array<RoutableItem>;
}

/**
 * RouteItemsResponse data structure
 *
 * @typedef {Object} RouteItemsResponse
 * @property {Array<ItemWithRouting>} items
 */
export interface RouteItemsResponse {
  items: Array<ItemWithRouting>;
}
