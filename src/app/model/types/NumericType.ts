import {intAttr} from '../../utility'
import {parseParameterType} from './ParameterType'
import {LimitedType, parseMaxValue, parseMinValue} from './LimitedType'
import {Converter} from './index'

export type NumericType = LimitedType<number> & {
  precision: number | null;
}

export const converter: Converter<number> = {
  format: String,
  parse: Number
}

export function parseNumericType(el: Element, override: Partial<NumericType> = {}): NumericType {

  const precision = intAttr(el, 'precision') ?? override.precision ?? null
  const format = precision !== null ? {
    format(value: number): string {
      return value.toFixed(precision)
    },
    parse: precision > 0 ? parseFloat : parseInt
  } : converter

  const minValue = parseMinValue(el, format, override.minValue)
  const maxValue = parseMaxValue(el, format, override.maxValue)

  return parseParameterType(el, format, {
    precision,
    minValue,
    maxValue
  })
}
