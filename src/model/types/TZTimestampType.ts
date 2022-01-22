import {parseParameterType} from './ParameterType'
import {LimitedType, parseMaxValue, parseMinValue} from './LimitedType'

export type TZTimestampType = LimitedType<Date>;

const STRIP_DASH = /-/g
const STRIP_MS = /\.\d\d\d/

export const converter = {
  format(value: Date): string {
    const [date, time] = value.toISOString().split('T')
    return `${date.replace(STRIP_DASH, '')}-${time.replace(STRIP_MS, '')}`
  },
  parse(text: string): Date {
    let YYYY = text.slice(0, 4)
    let MM = text.slice(4, 6)
    let DD = text.slice(6, 8)
    return new Date(`${YYYY}-${MM}-${DD}T${text.slice(9)}`)
  }
}

export function parseTZTimestampType(el: Element, override: Partial<TZTimestampType> = {}): TZTimestampType {

  const minValue = parseMinValue(el, converter, override.minValue)
  const maxValue = parseMaxValue(el, converter, override.maxValue)

  return parseParameterType(el, converter, {
    minValue,
    maxValue
  })
}
