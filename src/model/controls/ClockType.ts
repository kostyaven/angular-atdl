import {ControlType, parseControlType} from './ControlType'
import {converter} from '../types/TZTimeOnlyType'
import {useConverter} from '../types/UTCTimeOnlyType'
import {textAttr} from '../../utility'

export type ClockType = ControlType<Date>;

export function parseClockType(el: Element): ClockType {

  const localMktTz = textAttr(el, 'localMktTz')!
  const controlType = parseControlType(el, localMktTz === null ? converter : useConverter(localMktTz), {})

  if (textAttr(el, 'initValueMode') === '1') {
    const initValue = controlType.initValue
    const now = new Date()
    controlType.initValue =  initValue === null || initValue < now ? now : initValue
    controlType.value = controlType.initValue
  }

  return controlType
}
