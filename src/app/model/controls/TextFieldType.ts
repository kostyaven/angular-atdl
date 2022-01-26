import {ControlType, parseControlType} from './ControlType'
import {converter} from '../types/StringType'

export function parseTextFieldType(el: Element): ControlType<string> {
  return parseControlType(el, converter, {})
}
