import {ControlType, parseControlType} from './ControlType'
import {ListItemType, parseListItem} from './ListItemType'
import {converter} from '../types/StringType'
import {collect, textAttr} from '../../utility'

export type ControlListType = ControlType<string> & {
  orientation: 'HORIZONTAL' | 'VERTICAL';
  listItems: ListItemType[];
}

export function parseSelectListType(el: Element): ControlListType {
  return parseControlType(el, converter, {
    orientation: textAttr(el, 'orientation') === 'HORIZONTAL' ? 'HORIZONTAL' : 'VERTICAL',
    listItems: collect(el, 'lay:ListItem').map(parseListItem)
  })
}
