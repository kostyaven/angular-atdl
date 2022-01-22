import React, {useCallback} from 'react'
import {Checkbox, Tooltip} from 'antd'
import {ComponentProps} from './index'
import {ParameterType} from '../../model/types/ParameterType'
import {useStateRules} from '../use-state-rules'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {CheckBoxType} from '../../model/controls/CheckBoxType'

export function CheckBoxControl({control, onChange}: ComponentProps<CheckBoxType, ParameterType<boolean | string>>) {

  const {
    visible,
    enabled,
    value
  } = useStateRules(control)

  const changeCallback = useCallback(({target}) => onChange(target.checked), [control])

  return (
    <div id={control.ID} className="CheckBox Control" hidden={!visible} aria-disabled={!enabled}>
      <Checkbox checked={Boolean(value)} disabled={!enabled} onChange={changeCallback}>{control.label}</Checkbox>
      <Tooltip title={control.tooltip}>
        {control.tooltip ? <QuestionCircleOutlined/> : null}
      </Tooltip>
    </div>
  )
}
