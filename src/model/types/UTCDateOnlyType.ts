import {parseParameterType} from './ParameterType'
import {parseMaxValue, parseMinValue} from './LimitedType'
import {parseDate, UTCTimestampType} from './UTCTimestampType'

export const converter = {
  format(value: Date): string {
    return value.toISOString().substring(0, 10).replace(/-/g, '')
  },
  parse: parseDate
}

export function parseUTCDateOnlyType(el: Element, override: Partial<UTCTimestampType> = {}): UTCTimestampType {

  const minValue = parseMinValue(el, converter, override.minValue)
  const maxValue = parseMaxValue(el, converter, override.maxValue)

  return parseParameterType(el, converter, {
    localMktTz: null,
    minValue,
    maxValue
  })
}
