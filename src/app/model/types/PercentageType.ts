import {intAttr, textAttr} from '../../utility'
import {parseParameterType} from './ParameterType'
import {parseMaxValue, parseMinValue} from './LimitedType'
import {NumericType} from './NumericType'
import {Converter} from './index'

export type PercentageType = NumericType & {
  multiplyBy100: boolean;
}

export const useConverter = (multiplyBy100 = true, precision = 2): Converter<number> => ({
  format(value: number): string {
    return (multiplyBy100 ? value * 100 : value).toFixed(precision)
  },
  parse(value: string): number {
    let number = Number(value)
    return multiplyBy100 ? number / 100 : number
  }
})

export function parsePercentageType(el: Element): NumericType {

  const multiplyBy100 = textAttr(el, 'multiplyBy100') === 'true'
  const precision = (intAttr(el, 'precision') ?? 0) + (multiplyBy100 ? 0 : 2)

  const converter = useConverter(multiplyBy100, precision)

  const minValue = parseMinValue(el, converter, 0)
  const maxValue = parseMaxValue(el, converter, 1)

  return parseParameterType(el, converter, {
    multiplyBy100,
    precision,
    minValue,
    maxValue
  })
}
