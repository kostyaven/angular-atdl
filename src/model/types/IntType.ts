import {parseAttr} from '../../utility'
import {parseParameterType} from './ParameterType'
import {NumericType} from './NumericType'
import {Converter} from './index'

export const converter: Converter<number> = {
  format: String,
  parse: parseInt
}

export function parseIntType(el: Element, override: Partial<NumericType> = {}): NumericType {

  const minValue = parseAttr(el, 'minValue', parseInt) ?? override.minValue ?? null
  const maxValue = parseAttr(el, 'maxValue', parseInt) ?? override.maxValue ?? null

  return parseParameterType(el, converter, {
    precision: 0,
    minValue,
    maxValue
  })
}
