import {ParameterType} from './ParameterType'
import {parseAttr} from '../../utility'
import {Converter} from './index'

export type LimitedType<V> = ParameterType<V> & {
  minValue: V | null;
  maxValue: V | null;
}

export function parseMinValue<V>(el: Element, format: Converter<V>, minValue?: V): V | null {
  return parseAttr(el, 'minValue', format.parse) ?? minValue ?? null
}

export function parseMaxValue<V>(el: Element, format: Converter<V>, maxValue?: V): V | null {
  return parseAttr(el, 'maxValue', format.parse) ?? maxValue ?? null
}