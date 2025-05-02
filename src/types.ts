/**
 * Represents a time period with start and end dates
 *
 * @typedef {Object} TimeRange
 * @property {'one_time' | 'time_range'} type - The type of the range
 * @property {Date} at - The date for one_time type
 * @property {Date} start_date - The beginning date of the range
 * @property {Date | null} end_date - The ending date of the range
 */
export type TimeRange =
  | {
      type: 'one_time';
      at: Date;
    }
  | {
      type: 'time_range';
      start_date: Date;
      end_date: Date | null;
    };

/**
 * Represents a supported currency code
 *
 * @typedef {string} Currency
 * @pattern (?i)^(usd|aed|afn|all|amd|ang|aoa|ars|aud|awg|azn|bam|bbd|bdt|bgn|bhd|bif|bmd|bnd|bob|brl|bsd|bwp|byn|bzd|cad|cdf|chf|clp|cny|cop|crc|cve|czk|djf|dkk|dop|dzd|egp|etb|eur|fjd|fkp|gbp|gel|gip|gmd|gnf|gtq|gyd|hkd|hnl|hrk|htg|huf|idr|ils|inr|isk|jmd|jod|jpy|kes|kgs|khr|kmf|krw|kwd|kyd|kzt|lak|lbp|lkr|lrd|lsl|mad|mdl|mga|mkd|mmk|mnt|mop|mur|mvr|mwk|mxn|myr|mzn|nad|ngn|nio|nok|npr|nzd|omr|pab|pen|pgk|php|pkr|pln|pyg|qar|ron|rsd|rub|rwf|sar|sbd|scr|sek|sgd|shp|sle|sos|srd|std|szl|thb|tjs|tnd|top|try|ttd|twd|tzs|uah|ugx|uyu|uzs|vnd|vuv|wst|xaf|xcd|xcg|xof|xpf|yer|zar|zmw)$
 */
export type Currency = string;

/**
 * Represents a monetary value with amount and currency
 *
 * @typedef {Object} MonetaryAmount
 * @property {number} amount - The numerical value
 * @property {Currency} currency - The currency code
 */
export type MonetaryAmount = {
  amount: number;
  currency: Currency;
};

/**
 * Represents a positive monetary value with amount and currency
 *
 * @typedef {Object} PositiveMonetaryAmount
 * @property {number} amount - The numerical value
 * @property {Currency} currency - The currency code
 */
export type PositiveMonetaryAmount = {
  /** @minimum 0 */
  amount: number;
  currency: Currency;
};

/**
 * Represents a percentage number value (0-100)
 *
 * @typedef {number} Percent
 */
/** @minimum 0 @maximum 100 */
export type Percent = number;

/**
 * Represents a decimal number value
 *
 * @typedef {string} Decimal
 */
export type Decimal = string;

/**
 * Represents a metadata object with string keys and values
 *
 * @typedef {Object} Metadata
 * @property {string} [k: string] - The key-value pair
 */
export interface Metadata {
  [k: string]: string;
}
