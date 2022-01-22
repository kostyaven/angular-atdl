import {ControlType} from '../controls/ControlType'
import {textAttr} from '../../utility'
import {parseControl} from '../controls'

export type StrategyPanelChild = { panel?: StrategyPanelType, control?: ControlType<any>, type?: string };

export type StrategyPanelType = {
  title: string | null;
  collapsed: boolean;
  collapsible: boolean;
  color: string | null;
  orientation: 'HORIZONTAL' | 'VERTICAL';
  border: 'NONE' | 'LINE';
  children: Array<StrategyPanelChild>
}

export type StrategyLayoutType = {
  strategyPanel: StrategyPanelType;
}

export function parseStrategyPanel(el: Element): StrategyPanelType {
  const children = new Array<StrategyPanelChild>()
  for (const node of Array.from(el.children)) {
    if (node instanceof Element) {
      if (node.tagName === 'lay:StrategyPanel') {
        children.push({panel: parseStrategyPanel(node)!})
      }
      if (node.tagName === 'lay:Control') {
        let ID = textAttr(node, 'ID')!
        children.push({control: parseControl(node)!})
      }
    }
  }
  return {
    title: textAttr(el, 'title'),
    color: textAttr(el, 'color'),
    collapsed: textAttr(el, 'collapsed') === 'true',
    collapsible: textAttr(el, 'collapsible') === 'true',
    orientation: textAttr(el, 'orientation') === 'HORIZONTAL' ? 'HORIZONTAL' : 'VERTICAL',
    border: textAttr(el, 'border') === 'LINE' ? 'LINE' : 'NONE',
    children
  }
}

export function parseStrategyLayout(el: Element): StrategyLayoutType {
  return {
    strategyPanel: parseStrategyPanel(el.firstElementChild!)
  }
}