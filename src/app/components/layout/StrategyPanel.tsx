import React, {useCallback, useState} from 'react'

import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import {StrategyPanelType} from '../../model/layout/StrategyPanelType'
import {FIXAtdlState, updateControl} from '../../redux'
import {components} from './index'

function ToggleCollapsed(props: { collapsed: boolean, onToggle: (collapsed: boolean) => void }) {
  if (props.collapsed) {
    return <BsFillCaretUpFill onClick={() => props.onToggle(false)}/>
  } else {
    return <BsFillCaretDownFill onClick={() => props.onToggle(true)}/>
  }
}

export type StrategyPanelProps = {
  panel: StrategyPanelType;
};

export function StrategyPanel({panel}: StrategyPanelProps) {

  const {
    title,
    collapsed: defaultCollapsed,
    collapsible,
    color,
    orientation,
    border,
    children
  } = panel

  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const parameters = useSelector((state: FIXAtdlState) => state.parameters)
  const dispatch = useDispatch()

  const attrs = {
    orientation,
    border
  }

  let component = (
    <div className="StrategyPanel" {...attrs}>
      {collapsed
        ? null
        : children.map(({ panel, control }, index) => {
            if (panel) {
              return (
                <StrategyPanel key={index} panel={panel} />
              )
            }
            if (control) {
              let Component = components.get(control.type)!
              let parameter = control.parameterRef && parameters[control.parameterRef] || null
              let onChange = useCallback(function (value) {
                dispatch(updateControl([control.ID, value]))
              }, [control])
              return (
                <Component key={control.ID} control={control} parameter={parameter} onChange={onChange} />
              )
            }
            throw "Unlnown component";
          })}
    </div>
  )

  if (title || collapsible) {
    component = (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
        <div className="title" style={{
          display: 'flex',
          flexDirection: 'row',
          borderBottom: '1px solid lightgray'
        }}>
          {title}
          <ToggleCollapsed collapsed={collapsed} onToggle={setCollapsed}/>
        </div>
        {component}
      </div>
    )
  }
  return component
}
