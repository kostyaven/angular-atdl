import {ControlType, parseControlType} from './ControlType'
import {converter} from '../types/NumericType'
import {parseAttr, textAttr} from '../../utility'

export type DoubleSpinnerType = ControlType<number> & {
  innerIncrement: number | null;
  innerIncrementPolicy: string | null;
  outerIncrement: number | null;
  outerIncrementPolicy: string | null;
}

export function parseDoubleSpinnerType(el: Element): DoubleSpinnerType {
  return parseControlType(el, converter, {
    innerIncrement: parseAttr(el, 'innerIncrement', converter.parse),
    innerIncrementPolicy: textAttr(el, 'innerIncrementPolicy'),
    outerIncrement: parseAttr(el, 'outerIncrement', converter.parse),
    outerIncrementPolicy: textAttr(el, 'outerIncrementPolicy')
  })

}
