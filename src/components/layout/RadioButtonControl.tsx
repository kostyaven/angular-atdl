import React from 'react'

export interface Properties {
  control: any
}

export function RadioButtonControl({control}: Properties) {
  return (
    <div id={control.ID} className="RadioButtonControl">{control.constructor.name}</div>
  )
}