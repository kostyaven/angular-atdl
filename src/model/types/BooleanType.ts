import {textAttr} from '../../utility'
import {ParameterType, parseParameterType} from './ParameterType'
import {Converter} from './index'

export type BooleanType = ParameterType<boolean> & {
  /**
   * @deprecated
   */
  falseWireValue?: string;
  /**
   * @deprecated
   */
  trueWireValue?: string;
}

export const useConverter = (TRUE = 'Y', FALSE = 'N'): Converter<boolean> => ({
  format(value: boolean): string {
    return value ? TRUE : FALSE
  },
  parse(value: string): boolean {
    return value === TRUE
  }
})

export function parseBooleanType(el: Element): BooleanType {

  let trueWireValue = textAttr(el, 'trueWireValue')
  if (trueWireValue) {
    let falseWireValue = textAttr(el, 'falseWireValue')
    if (falseWireValue) {
      return parseParameterType(el, useConverter(trueWireValue, falseWireValue), {})
    }
  }

  return parseParameterType(el, useConverter(), {})
}
