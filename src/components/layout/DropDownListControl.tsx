import React from 'react'
import {Select} from 'antd'
import {ControlListType} from '../../model/controls/ControlListType'
import {ComponentProps} from './index'
import {ParameterType} from '../../model/types/ParameterType'
import {useStateRules} from '../use-state-rules'

export function DropDownListControl({
                                      control,
                                      onChange
                                    }: ComponentProps<ControlListType, ParameterType<boolean | string>>) {

  const {
    visible,
    enabled,
    value
  } = useStateRules(control)

  return (
    <div id={control.ID} className="DropDownList Control" hidden={!visible} aria-disabled={!enabled}>
      <div className="label">{control.label}</div>
      <Select
        disabled={!enabled}
        value={value}
        showSearch
        style={{width: 200}}
        placeholder={control.label}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={(input, option) => String(option?.children).toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {control.listItems.map((listItem, index) => (
          <Select.Option key={index} value={listItem.enumID ?? '{NULL}'}>{listItem.uiRep}</Select.Option>
        ))}
      </Select>
    </div>
  )
}