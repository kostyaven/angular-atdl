import {collect, textAttr, textContent} from '../../utility'
import {Edit, parseEdit} from '../validation'

export type StateRule = {
  description: string | null;
  edit: Edit | null;
  editRef: string | null;
  enabled: string | null;
  visible: string | null;
  value: string | null;
}

export function parseStateRule(el: Element): StateRule {
  return {
    description: textContent(el, 'Description'),
    edit: collect(el, 'val:Edit').map(parseEdit)[0],
    editRef: collect(el, 'val:Edit').map(er => textAttr(er, 'id'))[0],
    enabled: textAttr(el, 'enabled'),
    visible: textAttr(el, 'visible'),
    value: textAttr(el, 'value')
  }
}