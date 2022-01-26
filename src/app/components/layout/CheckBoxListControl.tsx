import React from 'react'
import {ComponentProps} from './index'
import {ParameterType} from '../../model/types/ParameterType'
import {ControlListType} from '../../model/controls/ControlListType'


export type CheckBoxListControlProps = ComponentProps<ControlListType, ParameterType<string[] | string>>;

export function CheckBoxListControl({control}: CheckBoxListControlProps) {
  return (
    <div id={control.ID} className="CheckBoxList Control">{control.constructor.name}</div>
  )
}