import React from 'react'

export interface Properties {
  control: any
}

export function SingleSelectListControl({control}: Properties) {
  return (
    <div id={control.ID} className="SingleSelectListControl">{control.constructor.name}</div>
  )
}