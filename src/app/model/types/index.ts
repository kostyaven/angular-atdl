import {parseNumericType} from './NumericType'
import {parseStringType} from './StringType'
import {parseBooleanType} from './BooleanType'
import {parseIntType} from './IntType'
import {parseMultipleStringValueType} from './MultipleStringValueType'
import {parseUTCDateOnlyType} from './UTCDateOnlyType'
import {parseUTCTimeOnlyType} from './UTCTimeOnlyType'
import {parseUTCTimestampType} from './UTCTimestampType'
import {parseTZTimestampType} from './TZTimestampType'
import {parseTZTimeOnlyType} from './TZTimeOnlyType'
import {parseLocalMktDateType} from './LocalMktDateType'
import {parseMonthYearType} from './MonthYearType'
import {parsePercentageType} from './PercentageType'
import {parseTenorType} from './TenorType'
import {collect, groupBy, intAttr, textAttr, textContent} from '../../utility'
import {ParameterType} from './ParameterType'
import {parseStrategyLayout, StrategyLayoutType} from '../layout/StrategyPanelType'
import {parseStrategyEdits, StrategyEdit} from '../validation'

export type Converter<V> = {
  format(value: V): string;
  parse(text: string): V;
}

export type InclusionType = {
  include: boolean;
  exclude: boolean;
}

export type CountryType = InclusionType & {
  code: string;
}

export type RegionType = InclusionType & {
  name: string;
  countries: {
    [code: string]: CountryType
  };
}

export type MarketType = InclusionType & {
  MIC: string;
}

export type SecurityType = InclusionType & {
  name: string;
}

export type RepeatingGroupType = {
  name: string | null;
  fixTag: number | null;
  minSize: number | null;
  maxSize: number | null;

  description: string | null;
  parameters: ParameterType<any>[];
}

export type StrategyType = {
  name: string;
  uiRep: string;
  wireValue: string;
  version: string | null;
  fixMsgType: string | null;
  disclosureDoc: string | null;
  sentOrderLink: string | null;
  providerID: string | null;
  providerSubID: string | null;
  imageLocation: string | null;
  totalLegs: number | null;
  totalOrders: number | null;
  commonIDTag: number | null;
  totalOrdersTag: number | null;
  orderSequenceTag: number | null;

  description: string | null;
  regions: {
    [name: string]: RegionType
  };
  markets: {
    [MIC: string]: MarketType
  };
  securities: {
    [name: string]: SecurityType
  };

  repeatingGroups: RepeatingGroupType[] | null;

  strategyLayout: StrategyLayoutType;

  strategyEdits: StrategyEdit[];
}

export function parseInclusionType(el: Element): InclusionType {
  return {
    include: textAttr(el, 'inclusion') === 'Include',
    exclude: textAttr(el, 'inclusion') === 'Exclude'
  }
}

export function parseCountryType(el: Element): CountryType {
  return Object.assign(parseInclusionType(el), {
    code: textAttr(el, 'CountryCode')!
  })
}

export function parseRegionType(el: Element): RegionType {
  return Object.assign(parseInclusionType(el), {
    name: textAttr(el, 'name')!,
    countries: collect(el, 'Country').map(parseCountryType).reduce(groupBy('code'), {})
  })
}

export function parseMarketType(el: Element): MarketType {
  return Object.assign(parseInclusionType(el), {
    MIC: textAttr(el, 'MICCode')!
  })
}

export function parseSecurityType(el: Element): SecurityType {
  return Object.assign(parseInclusionType(el), {
    name: textAttr(el, 'name')!
  })
}

export function parseRepeatingGroupType(el: Element): RepeatingGroupType {
  return {
    name: textAttr(el, 'name'),
    fixTag: intAttr(el, 'fixTag'),
    minSize: intAttr(el, 'minSize'),
    maxSize: intAttr(el, 'maxSize'),

    description: textContent(el, 'Description'),
    parameters: collect(el, 'Parameter').map(parseParameter)
  }
}

export function parseStrategyType(el: Element): StrategyType {
  return {
    name: textAttr(el, 'name')!,
    uiRep: textAttr(el, 'uiRep') ?? textAttr(el, 'name')!,
    wireValue: textAttr(el, 'wireValue')!,
    version: textAttr(el, 'version'),
    fixMsgType: textAttr(el, 'fixMsgType'),
    disclosureDoc: textAttr(el, 'disclosureDoc'),
    sentOrderLink: textAttr(el, 'sentOrderLink'),
    providerID: textAttr(el, 'providerID'),
    providerSubID: textAttr(el, 'providerSubID'),
    imageLocation: textAttr(el, 'imageLocation'),

    totalLegs: intAttr(el, 'totalLegs'),
    totalOrders: intAttr(el, 'totalOrders'),
    commonIDTag: intAttr(el, 'commonIDTag'),
    totalOrdersTag: intAttr(el, 'totalOrdersTag'),
    orderSequenceTag: intAttr(el, 'orderSequenceTag'),

    description: textContent(el, 'Description'),

    regions: collect(el, 'Region').map(r => parseRegionType(r)).reduce(groupBy('name'), {}),
    markets: collect(el, 'Market').map(m => parseMarketType(m)).reduce(groupBy('MIC'), {}),
    securities: collect(el, 'Security').map(s => parseSecurityType(s)).reduce(groupBy('name'), {}),

    repeatingGroups: collect(el, 'RepeatingGroup').map(rg => parseRepeatingGroupType(rg)),

    strategyEdits: parseStrategyEdits(el),

    strategyLayout: (collect(el, 'lay:StrategyLayout').map(el => parseStrategyLayout(el))[0])!
  }
}

export function parseParameter(el: Element): ParameterType<any> {

  let type = el.getAttribute('xsi:type') || 'String_t'

  switch (type) {                                                                                    // @formatter:off
    case 'Amt_t':
      return parseNumericType(el, {minValue: 0})
    case 'Boolean_t':
      return parseBooleanType(el)
    case 'Char_t':
      return parseStringType(el)
    case 'Country_t':
      return parseStringType(el)
    case 'Currency_t':
      return parseStringType(el)
    case 'Data_t':
      return parseStringType(el)
    case 'Exchange_t':
      return parseStringType(el)
    case 'Float_t':
      return parseNumericType(el)
    case 'Int_t':
      return parseIntType(el)
    case 'Language_t':
      return parseStringType(el)
    case 'Length_t':
      return parseIntType(el)
    case 'LocalMktDate_t':
      return parseLocalMktDateType(el)
    case 'MonthYear_t':
      return parseMonthYearType(el)
    case 'MultipleCharValue_t':
      return parseMultipleStringValueType(el)
    case 'MultipleStringValue_t':
      return parseMultipleStringValueType(el)
    case 'NumInGroup_t':
      return parseIntType(el)
    case 'Percentage_t':
      return parsePercentageType(el)
    case 'Price_t':
      return parseNumericType(el)
    case 'PriceOffset_t':
      return parseNumericType(el, {minValue: 0})
    case 'Qty_t':
      return parseNumericType(el, {minValue: 0})
    case 'SeqNum_t':
      return parseIntType(el)
    case 'String_t':
      return parseStringType(el)
    case 'TagNum_t':
      return parseIntType(el)
    case 'Tenor_t':
      return parseTenorType(el)
    case 'TZTimeOnly_t':
      return parseTZTimeOnlyType(el)
    case 'TZTimestamp_t':
      return parseTZTimestampType(el)
    case 'UTCDateOnly_t':
      return parseUTCDateOnlyType(el)
    case 'UTCTimeOnly_t':
      return parseUTCTimeOnlyType(el)
    case 'UTCTimestamp_t':
      return parseUTCTimestampType(el)
    default:
      throw new Error(`Unsupported parameter type: ${type}`)
  }                                                                                                   // @formatter:on
}
