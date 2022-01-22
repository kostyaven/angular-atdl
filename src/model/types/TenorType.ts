import {ParameterType, parseParameterType} from './ParameterType'
import {intAttr} from '../../utility'
import {Converter} from './index'

export interface Tenor {
  type: 'D' | 'M' | 'W' | 'Y';
  duration: number;
}

export type StringType = ParameterType<Tenor> & {
  minLength: number | null;
  maxLength: number | null;
}

export const converter: Converter<Tenor> = {
  format({type, duration}: Tenor): string {
    return type + duration
  },
  parse(text: string): Tenor {
    let t = text[0].toUpperCase()
    return {
      type: t === 'D' ? 'D' : t === 'W' ? 'W' : t === 'M' ? 'M' : 'Y',
      duration: parseInt(text.substring(1))
    }
  }
}

export function parseTenorType(el: Element): StringType {
  const minLength = intAttr(el, 'minLength')
  const maxLength = intAttr(el, 'maxLength')
  return parseParameterType(el, converter, {
    minLength,
    maxLength
  })
}