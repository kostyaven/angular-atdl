import React from 'react'

export interface Properties {
  control: any
}

export function MultiSelectListControl({control}: Properties) {
  return (
    <div id={control.ID} className="MultiSelectListControl">{control.constructor.name}</div>
  )
}