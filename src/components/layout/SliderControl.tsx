import React from 'react'

export interface Properties {
  control: any
}

export function SliderControl({control}: Properties) {
  return (
    <div id={control.ID} className="SliderControl">{control.constructor.name}</div>
  )
}