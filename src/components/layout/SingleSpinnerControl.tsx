import React, {useCallback} from 'react'
import {InputNumber, Tooltip} from 'antd'
import {useStateRules} from '../use-state-rules'
import {QuestionCircleOutlined} from '@ant-design/icons'
import {ComponentProps} from './index'
import {ParameterType} from '../../model/types/ParameterType'
import {SingleSpinnerType} from '../../model/controls/SingleSpinnerType'

export function SingleSpinnerControl({control, onChange}: ComponentProps<SingleSpinnerType, ParameterType<number>>) {

  const {
    visible,
    enabled,
    value
  } = useStateRules(control)

  return (
    <div id={control.ID} className="SingleSpinner Control" hidden={!visible}>
      <div className="label">{control.label}</div>
      <InputNumber disabled={!enabled} value={value} onChange={onChange}/>
      <Tooltip title={control.tooltip}>
        {control.tooltip ? <QuestionCircleOutlined/> : null}
      </Tooltip>
    </div>
  )
}