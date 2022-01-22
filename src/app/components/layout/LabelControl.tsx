import React from 'react'

export interface Properties {
  control: any
}

export function LabelControl({control}: Properties) {
  return (
    <div id={control.ID} className="LabelControl">{control.constructor.name}</div>
  )
}