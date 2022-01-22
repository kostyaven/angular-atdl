import {EnumPairs, parseEnumPairs} from './EnumPairType'
import {intAttr, parseAttr, textAttr, textContent} from '../../utility'
import {Converter} from './index'

export type ParameterType<V> = {

  name: string;
  type: string;
  fixTag: number | null;
  use: string;
  mutableOnCxlRpl: boolean;
  revertOnCxlRpl: boolean;
  definedByFIX: boolean;

  description: string | null;
  enumPairs: EnumPairs | null;

  converter: Converter<V>;

  value: V | null;
  wireValue: string | null;
}

export function parseParameterType<V, O>(
  el: Element,
  converter: Converter<V>,
  override: O
): ParameterType<V> & O {
  let enumPairs = parseEnumPairs(el)
  let parameterType = {
    name: textAttr(el, 'name')!,
    type: textAttr(el, 'xsi:type')!.slice(0, -2),
    fixTag: intAttr(el, 'fixTag'),
    use: textAttr(el, 'use') || 'optional',
    mutableOnCxlRpl: textAttr(el, 'mutableOnCxlRpl') === 'true',
    revertOnCxlRpl: textAttr(el, 'revertOnCxlRpl') === 'true',
    definedByFIX: textAttr(el, 'definedByFIX') === 'true',
    description: textContent(el, 'Description'),
    enumPairs: enumPairs,
    value: parseAttr(el, 'constValue', converter.parse),
    converter,
    get wireValue(): string | null {
      if (this.value !== null) {
        return converter.format(this.value)
      } else {
        return null
      }
    },
    set wireValue(text: string | null) {
      if (text !== null) {
        this.value = converter.parse(text)
      } else {
        this.value = null
      }
    },
    ...override
  }
  return parameterType
}
