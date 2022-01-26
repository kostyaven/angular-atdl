import {textAttr} from '../../utility'
import {getTimezone} from 'countries-and-timezones'
import {parseParameterType} from './ParameterType'
import {LimitedType, parseMaxValue, parseMinValue} from './LimitedType'

export type UTCTimestampType = LimitedType<Date> & {
  localMktTz: string | null;
}

export function parseFull(value: string, utcOffset: string): Date {
  let YYYY = value.slice(0, 4)
  let MM = value.slice(4, 6)
  let DD = value.slice(6, 8)
  let time = value.charAt(17) === '.' ? value.slice(9, 21) : value.slice(9, 17) + '.000'
  return new Date(`${YYYY}-${MM}-${DD}T${time}${utcOffset}`)
}

export function parseDate(value: string): Date {
  let YYYY = value.slice(0, 4)
  let MM = value.slice(4, 6)
  let DD = value.slice(6, 8)
  return new Date(`${YYYY}-${MM}-${DD}T00:00:00.000Z`)
}

export function parseTime(value: string, utcOffset: string): Date {
  let date = new Date().toISOString().substring(0, 10)
  let time = value.lastIndexOf('.') > 0 ? value : value + '.000'
  return new Date(`${date}T${time}${utcOffset}`)
}

export const useConverter = (localMktTz: string | null) => {
  const utcOffset = localMktTz && getTimezone(localMktTz)?.utcOffsetStr || 'Z'
  return {
    format(value: Date): string {
      return value.toISOString()
        .slice(0, -1)
        .replace(/-/g, '')
        .replace(/T/, '-')
    },
    parse(text: string): Date {
      if (text.charAt(8) === '-') {
        return parseFull(text, utcOffset)
      } else if (text.charAt(2) === ':') {
        return parseTime(text, utcOffset)
      } else {
        return parseDate(text)
      }
    }
  }
}


export function parseUTCTimestampType(el: Element, override: Partial<UTCTimestampType> = {}): UTCTimestampType {

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
