import {ControlType, parseControlType} from './ControlType'
import {textAttr} from '../../utility'
import {Converter} from '../types'

export type CheckBoxType = ControlType<boolean> & {
  checkedEnumRef: string | null;
  uncheckedEnumRef: string | null;
};

export const useConverter = (trueWireValue: string = 'true', falseWireValue: string = 'false') => {
  return {
    format(value: boolean): string {
      return value ? trueWireValue : falseWireValue
    },
    parse(value: string): boolean {
      return value === trueWireValue
    }
  } as Converter<boolean>
}

export function parseCheckBoxType(el: Element): CheckBoxType {

  const checkedEnumRef = textAttr(el, 'checkedEnumRef')
  const uncheckedEnumRef = textAttr(el, 'uncheckedEnumRef')

  const converter = useConverter(checkedEnumRef ?? undefined, uncheckedEnumRef ?? undefined)

  return parseControlType(el, converter, {
    checkedEnumRef,
    uncheckedEnumRef
  })
}
