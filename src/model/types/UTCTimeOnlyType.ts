import {textAttr} from '../../utility'
import {getTimezone} from 'countries-and-timezones'
import {parseParameterType} from './ParameterType'
import {parseMaxValue, parseMinValue} from './LimitedType'
import {parseTime, UTCTimestampType} from './UTCTimestampType'

export const useConverter = (localMktTz: string | null) => {
  const utcOffset = localMktTz && getTimezone(localMktTz)?.utcOffsetStr || 'Z'
  return {
    format(value: Date): string {
      return value.toISOString().slice(11, -1)
    },
    parse(text: string): Date {
      return parseTime(text, utcOffset)
    }
  }
}

export function parseUTCTimeOnlyType(el: Element, override: Partial<UTCTimestampType> = {}): UTCTimestampType {

  const localMktTz = textAttr(el, 'localMktTz')
  const converter = useConverter(localMktTz)

  const minValue = parseMinValue(el, converter, override.minValue)
  const maxValue = parseMaxValue(el, converter, override.maxValue)

  return parseParameterType(el, converter, {
    localMktTz,
    minValue,
    maxValue
  })
}
