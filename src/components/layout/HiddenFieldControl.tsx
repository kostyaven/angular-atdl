import React from 'react'

export interface Properties {
  control: any
}

export function HiddenFieldControl({control}: Properties) {
  return (
    <div id={control.ID} className="HiddenFieldControl">{control.constructor.name}</div>
  )
}