import {parseParameterType} from './ParameterType'
import {parseMaxValue, parseMinValue} from './LimitedType'
import {TZTimestampType} from './TZTimestampType'

const STRIP_MS = /\.\d\d\d/

export const converter = {
  format(value: Date): string {
    return value.toISOString().substring(11).replace(STRIP_MS, '')
  },
  parse(text: string): Date {
    let date = new Date().toISOString().substring(0, 10)
    return new Date(`${date}T${text}`)
  }
}

export function parseTZTimeOnlyType(el: Element, override: Partial<TZTimestampType> = {}): TZTimestampType {

  const minValue = parseMinValue(el, converter, override.minValue)
  const maxValue = parseMaxValue(el, converter, override.maxValue)

  return parseParameterType(el, converter, {
    minValue,
    maxValue
  })
}
