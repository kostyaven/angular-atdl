import {collect, parseAttr, textAttr, textContent} from '../../utility'
import {parseStateRule, StateRule} from '../flow/StateRule'
import {Converter} from '../types'

import {store} from '../../redux'

export type ControlType<V> = {

  ID: string;
  type: string;
  initValue: V;
  label: string | null;
  tooltip: string | null;
  disableForTemplate: Boolean;
  stateRules: StateRule[];
  parameterRef: string | null;

  helpText: string | null;

  enabled: boolean;
  visible: boolean;

  value: V | null;
  converter: Converter<V>;

  save(template: Map<string, string | null>): void;
  restore(template: Map<string, string | null>): void;
}

export function parseControlType<V, O>(
  el: Element,
  converter: Converter<V>,
  override: O
): ControlType<V> & O {

  const ID = textAttr(el, 'ID')!
  const tooltip = textAttr(el, 'tooltip')
  const initFixField = textAttr(el, 'initFixField')
  const stateRules = collect(el, 'flow:StateRule').map(parseStateRule)

  const initValue = textAttr(el, 'initPolicy') === 'UseFixField'
    ? store.getState().standardFixFields[initFixField!]
    : parseAttr(el, 'initValue', converter.parse)

  return {
    ID,
    type: textAttr(el, 'xsi:type')!,
    initValue,
    label: textAttr(el, 'label'),
    tooltip,
    disableForTemplate: textAttr(el, 'disableForTemplate') === 'true',
    parameterRef: textAttr(el, 'parameterRef'),
    helpText: textContent(el, 'lay:HelpText'),
    stateRules,
    value: initValue,
    converter,
    enabled: true,
    visible: true,
    save(template: Map<string, string | null>): void {
      const value = this.value
      if (!(textAttr(el, 'disableForTemplate') === 'true') && value !== initValue) {
        template.set(ID, value !== null ? converter.format(value) : null)
      }
    },
    restore(template: Map<string, string | null>): void {
      if (!(textAttr(el, 'disableForTemplate') === 'true') && template.has(ID)) {
        let templateValue = template.get(ID) ?? null
        this.value = templateValue !== null ? converter.parse(templateValue) : null
      }
    },
    ...override
  }
}


