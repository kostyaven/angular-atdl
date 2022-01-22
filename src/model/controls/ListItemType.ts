import {collect, textAttr} from '../../utility'
import {parseStateRule, StateRule} from '../flow/StateRule'

export type ListItemType = {
  stateRules: StateRule[],
  enumID: string | null;
  uiRep: string;
}

export function parseListItem(el: Element): ListItemType {
  return {
    stateRules: collect(el, 'flow:StateRule').map(parseStateRule),
    enumID: textAttr(el, 'enumID'),
    uiRep: textAttr(el, 'uiRep')!
  }
}
