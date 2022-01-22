import {ParameterType, parseParameterType} from './ParameterType'
import {intAttr} from '../../utility'
import {Converter} from './index'

export type StringType = ParameterType<string> & {
  minLength: number | null;
  maxLength: number | null;
}

export const converter: Converter<string> = {
  format: String,
  parse: String
}

export function parseStringType(el: Element): StringType {
  const minLength = intAttr(el, 'minLength')
  const maxLength = intAttr(el, 'maxLength')
  return parseParameterType(el, converter, {
    minLength,
    maxLength
  })
}