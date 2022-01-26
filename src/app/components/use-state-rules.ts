import {useSelector} from 'react-redux'
import {FIXAtdlState} from '../redux'
import {ControlType} from '../model/controls/ControlType'

export type ControlState<V> = { enabled: boolean, visible: boolean, value: V };

export function useStateRules<V>(control: ControlType<V>): ControlState<V> {

  return useSelector<FIXAtdlState, ControlState<V>>(state => {

    const {controls, standardFixFields, edits} = state
    const ctx = {
      fields: controls,
      standardFixFields,
      edits
    }

    const result = {
      enabled: true,
      visible: true,
      value: controls[control.ID].value
    } as ControlState<V>

    for (const rule of control.stateRules) {
      let edit = rule.editRef !== null ? edits[rule.editRef]! : rule.edit!
      if (rule.enabled !== null) {
        const enabled = rule.enabled === 'true' ? edit.eval(ctx) : !edit.eval(ctx)
        result.enabled = result.enabled && enabled
      }
      if (rule.visible !== null) {
        const visible = rule.visible === 'true' ? edit.eval(ctx) : !edit.eval(ctx)
        result.visible = result.visible && visible
      }
      if (rule.value !== null) {
        if (edit.eval(ctx)) {
          result.value = control.converter.parse(rule.value)
        }
      }
    }

    return result
  })
}

