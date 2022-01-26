import {textAttr} from '../../utility'
import {CheckBoxType, parseCheckBoxType} from './CheckBoxType'

export type RadioButtonType = CheckBoxType & {
  radioGroup: string | null;
};

export function parseRadioButtonType(el: Element): RadioButtonType {
  const controlType = parseCheckBoxType(el) as RadioButtonType
  controlType.radioGroup = textAttr(el, 'radioGroup')
  return controlType
}
