import {parseParameterType} from './ParameterType'
import {parseMaxValue, parseMinValue} from './LimitedType'
import {parseDate, UTCTimestampType} from './UTCTimestampType'
import {TZTimestampType} from './TZTimestampType'

export const converter = {
  format(value: Date): string {
    return value.toISOString().substring(0, 10).replace(/-/g, '')
  },
  parse: parseDate
}

export function parseLocalMktDateType(el: Element, override: Partial<UTCTimestampType> = {}): TZTimestampType {

  const minValue = parseMinValue(el, converter, override.minValue)
  const maxValue = parseMaxValue(el, converter, override.maxValue)

  return parseParameterType(el, converter, {
    minValue,
    maxValue
  })
}
