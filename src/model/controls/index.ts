import {parseSelectListType} from './ControlListType'
import {parseCheckBoxType} from './CheckBoxType'
import {parseClockType} from './ClockType'
import {parseDoubleSpinnerType} from './DoubleSpinnerType'
import {parseRadioButtonType} from './RadioButtonType'
import {parseSingleSpinnerType} from './SingleSpinnerType'
import {parseTextFieldType} from './TextFieldType'
import {ControlType} from './ControlType'

export function parseControl(el: Element): ControlType<any> {

  let type = el.getAttribute('xsi:type') || 'lay:String_t'

  switch (type) {                                                                                    // @formatter:off
    case 'lay:Clock_t':
      return parseClockType(el)
    case 'lay:TextField_t':
      return parseTextFieldType(el)
    case 'lay:SingleSelectList_t':
      return parseSelectListType(el)
    case 'lay:MultiSelectList_t':
      return parseSelectListType(el)
    case 'lay:Slider_t':
      return parseSelectListType(el)
    case 'lay:CheckBox_t':
      return parseCheckBoxType(el)
    case 'lay:CheckBoxList_t':
      return parseSelectListType(el)
    case 'lay:SingleSpinner_t':
      return parseSingleSpinnerType(el)
    case 'lay:DoubleSpinner_t':
      return parseDoubleSpinnerType(el)
    case 'lay:DropDownList_t':
      return parseSelectListType(el)
    case 'lay:EditableDropDownList_t':
      return parseSelectListType(el)
    case 'lay:RadioButton_t':
      return parseRadioButtonType(el)
    case 'lay:RadioButtonList_t':
      return parseSelectListType(el)
    case 'lay:Label_t':
      return parseTextFieldType(el)
    case 'lay:HiddenField_t':
      return parseTextFieldType(el)
    default:
      throw new Error(`Unsupported control type: ${type}`)
  }                                                                                                   // @formatter:on
}

