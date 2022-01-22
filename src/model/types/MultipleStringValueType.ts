import {ParameterType, parseParameterType} from './ParameterType'
import {hasAttr, intAttr} from '../../utility'
import {notification} from 'antd'
import {Converter} from './index'

export type MultipleStringValueType = ParameterType<string[]> & {
  minLength: number | null;
  maxLength: number | null;
}

export const converter: Converter<string[]> = {
  format(value: string[]): string {
    return value.join(' ')
  },
  parse(text: string): string[] {
    return text.trim().split(' ')
  }
}

export function parseMultipleStringValueType(el: Element): MultipleStringValueType {
  if (hasAttr(el, 'invertOnWire')) {
    notification.warn({
      message: `MISSING FIX-ATDL FEATURE`,
      description: 'Attribute \'invertOnWire\' is not supported yet.',
      placement: 'topRight'
    })
  }
  const minLength = intAttr(el, 'minLength')
  const maxLength = intAttr(el, 'maxLength')
  return parseParameterType(el, converter, {
    minLength,
    maxLength
  })
}
