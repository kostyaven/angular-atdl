import React, {useCallback} from 'react'
import {Input} from 'antd'
import {ComponentProps} from './index'
import {ParameterType} from '../../model/types/ParameterType'
import {ControlType} from '../../model/controls/ControlType'
import {useStateRules} from '../use-state-rules'

export function TextFieldControl({control, onChange}: ComponentProps<ControlType<string>, ParameterType<string>>) {

  const {
    visible,
    enabled,
    value
  } = useStateRules(control)

  const changeCallback = useCallback(({target}) => onChange(target.value), [control])

  return (
    <div id={control.ID} className="TextField Control" hidden={!visible} aria-disabled={!enabled}>
      <Input disabled={!enabled} addonBefore={control.label} placeholder={control.label ?? undefined} onChange={changeCallback} value={value}/>
    </div>
  )
}
