import React from 'react'

export interface Properties {
  control: any
}

export function DoubleSpinnerControl({control}: Properties) {
  return (
    <div id={control.ID} className="DoubleSpinnerControl">{control.constructor.name}</div>
  )
}