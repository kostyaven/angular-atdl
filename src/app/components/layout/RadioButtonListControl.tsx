import React from 'react'

export interface Properties {
  control: any
}

export function RadioButtonListControl({control}: Properties) {
  return (
    <div id={control.ID} className="RadioButtonListControl">{control.constructor.name}</div>
  )
}