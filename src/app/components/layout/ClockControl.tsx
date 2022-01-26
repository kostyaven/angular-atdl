import moment from 'moment'
import React, {useCallback} from 'react'
import {TimePicker} from 'antd'
import {ClockType} from '../../model/controls/ClockType'
import {ComponentProps} from './index'
import {useStateRules} from '../use-state-rules'

export function ClockControl({control, parameter, onChange}: ComponentProps<ClockType, any>) {

  const {
    visible,
    enabled,
    value
  } = useStateRules(control)

  const changeCallback = useCallback(({target: {value}}) => {
    if (parameter) {
      parameter.value = control.value
    }
    onChange(value)
  }, [control])

  return (
    <div id={control.ID} className="Clock Control" hidden={!visible} aria-disabled={!enabled}>
      <div className="label">{control.label}</div>
      <TimePicker disabled={!enabled} onChange={changeCallback} defaultValue={moment('00:00:00', 'HH:mm:ss')}/>
    </div>
  )
}