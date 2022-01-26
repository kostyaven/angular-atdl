import React from 'react'

export interface Properties {
  control: any
}

export function EditableDropDownListControl({control}: Properties) {
  return (
    <div id={control.ID} className="EditableDropDownListControl">{control.constructor.name}</div>
  )
}