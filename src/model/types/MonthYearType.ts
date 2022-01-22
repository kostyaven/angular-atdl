import {parseParameterType} from './ParameterType'
import {LimitedType, parseMaxValue, parseMinValue} from './LimitedType'
import {Converter} from './index'

export type MonthYear = {
  year: number;
  month: number;
  day?: number;
  week?: number;
}

export type MonthYearType = LimitedType<MonthYear>;

export const converter: Converter<MonthYear> = {
  format({year, month, day, week}: MonthYear): string {
    return `${year}${month}${day ? day : week ? 'W' + week : ''}`
  },
  parse(text: string): MonthYear {
    let YYYY = text.slice(0, 4)
    let MM = text.slice(4, 6)
    let WD = text.slice(6, 8)
    return {
      year: parseInt(YYYY),
      month: parseInt(MM),
      day: WD && WD[0] !== 'W' ? parseInt(WD) : undefined,
      week: WD[0] === 'W' ? parseInt(WD[1]) : undefined
    }
  }

}

export function parseMonthYearType(el: Element, override: Partial<MonthYearType> = {}): MonthYearType {

  const minValue = parseMinValue(el, converter, override.minValue)
  const maxValue = parseMaxValue(el, converter, override.maxValue)

  return parseParameterType(el, converter, {
    minValue,
    maxValue
  })
}
