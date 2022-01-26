import React, {ReactElement, useEffect, useState} from 'react'
import {StrategyPanel} from './layout/StrategyPanel'
import {Alert, Typography} from 'antd'

import {StrategyType} from '../model/types'
import {useSelector} from 'react-redux'
import {FIXAtdlState} from '../redux'

const {Title, Paragraph} = Typography

export interface Properties {
  strategy: StrategyType;
}

export function Strategy({strategy}: Properties) {

  const [logo, setLogo] = useState<ReactElement | null>()
  const [description, setDescription] = useState<ReactElement | null>()
  const [disclosureDoc, setDisclosureDoc] = useState<ReactElement>()

  useEffect(() => {
    if (strategy.description) setDescription(
      <Typography>
        <Paragraph>{strategy.description}</Paragraph>
      </Typography>
    )

    if (strategy.imageLocation) setLogo(
      <img src={strategy.imageLocation} alt="logo"/>
    )

    if (strategy.disclosureDoc) setDisclosureDoc(
      <a href={strategy.disclosureDoc}>disclosure doc</a>
    )
  }, [strategy])

  const errorMessages = useSelector<FIXAtdlState, string[]>(state => {
    const {parameters, standardFixFields, edits} = state
    const context = {
      fields: parameters,
      standardFixFields,
      edits
    }
    return strategy.strategyEdits.map(edit => edit.validate(context)).filter(Boolean) as string[]
  })

  const strategyPanel = strategy.strategyLayout.strategyPanel!
  return (
    <div className="Strategy" {...{name: strategy.name}}>
      {logo}
      {description}
      {disclosureDoc}
      <div className="ErrorMessages">
        {errorMessages?.map(message => <Alert message={message} type="error" showIcon/>)}
      </div>
      <StrategyPanel panel={strategyPanel}/>
    </div>
  )
}
