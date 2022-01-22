import {intAttr, textAttr, textContent} from '../../utility'

export type EnumPairType = {
  description: string | null;
  enumID: string;
  wireValue: string;
  index: number | null;
}

export function parseEnumPairType(el: Element): EnumPairType {
  return {
    description: textContent(el, 'Description'),
    enumID: textAttr(el, 'enumID')!,
    wireValue: textAttr(el, 'wireValue')!,
    index: intAttr(el, 'index')
  }
}

export type EnumPairs = { [enumID: string]: EnumPairType };

export function parseEnumPairs(el: Element): EnumPairs | null {
  let enumPairElements = el.querySelectorAll('EnumPair')
  if (enumPairElements.length) {
    const enumPairs: EnumPairs = {}
    for (const node of Array.from(enumPairElements)) {
      let enumPair = parseEnumPairType(node)
      enumPairs[enumPair.enumID] = enumPair
    }
    return enumPairs
  } else {
    return null
  }
}
