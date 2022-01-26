import {ControlType, parseControlType} from './ControlType'
import {converter} from '../types/NumericType'
import {parseAttr, textAttr} from '../../utility'

export type SingleSpinnerType = ControlType<number> & {
  increment: number | null;
  incrementPolicy: string | null;
}

export function parseSingleSpinnerType(el: Element): SingleSpinnerType {
  return parseControlType(el, converter, {
    increment: parseAttr(el, 'increment', converter.parse),
    incrementPolicy: textAttr(el, 'incrementPolicy')
  })

}
