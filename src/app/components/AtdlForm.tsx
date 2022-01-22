import React, {ReactElement, useEffect, useState} from 'react'
import {Typography} from 'antd'

import {Strategy} from './Strategy'
import {intAttr, textAttr, textContent} from '../utility'
import {parseStrategyType, StrategyType} from '../model/types'
import {DraftSwitch} from './DraftSwitch'
import {useDispatch} from 'react-redux'
import {loadStandardFixFields, selectStrategy} from '../redux'

const {Title, Paragraph} = Typography

export interface Properties {
  document: Document;
  strategyName: string;
  standardFixFields: { [name: string]: any };
}

export interface FIXAtdlFormActions {
  submit(): void;
  load(template: Record<string, any>): void;
  save(): Record<string, any>;
}

export function AtdlForm({document, strategyName, standardFixFields = {}}: Properties) {

  const [description, setDescription] = useState<ReactElement | null>()
  const [logo, setLogo] = useState<ReactElement | null>()
  const [draftSwitch, setDraftSwitch] = useState<ReactElement | null>()

  const [changeStrategyOnCxlRpl, setChangeStrategyOnCxlRpl] = useState<boolean>(false)
  const [tag957Support, setTag957Support] = useState<boolean>(false)
  const [strategy, setStrategy] = useState<StrategyType>()

  const actions: FIXAtdlFormActions = {
    submit(): void {
    },
    load(template: Record<string, any>): void {
    },
    save(): Record<string, any> {
      return {}
    }
  }

  let dispatch = useDispatch()

  useEffect(() => {

    dispatch(loadStandardFixFields(standardFixFields))

    let strategies = document.querySelector('Strategies')!
    let strategy = document.querySelector(`Strategy[name="${strategyName}"]`)!

    dispatch(selectStrategy(strategy))

    let imageLocationURL = textAttr(strategies, 'imageLocation')
    if (imageLocationURL) setLogo(
      <img src={imageLocationURL} alt="logo"/>
    )

    let descriptionText = textContent(strategies, 'Description')
    if (descriptionText) setDescription(
      <Typography>
        <Paragraph>{descriptionText}</Paragraph>
      </Typography>
    )

    const draftFlagIdentifierTag = intAttr(strategies, 'draftFlagIdentifierTag')
    if (draftFlagIdentifierTag) {
      setDraftSwitch(<DraftSwitch draftFlagIdentifierTag={draftFlagIdentifierTag}/>)
    }

    setStrategy(parseStrategyType(strategy))
    setChangeStrategyOnCxlRpl(textAttr(strategies, 'changeStrategyOnCxlRpl') === 'true')
    setTag957Support(textAttr(strategies, 'tag957Support') === 'true')

  }, [document, strategyName])

  return (
    <div className="AtdlForm">
      <div style={{padding: draftSwitch ? '8px' : 0, textAlign: 'right'}}>{draftSwitch}</div>
      {logo}
      {description}
      {strategy
        ? <Strategy strategy={strategy}/>
        : <div>Parsing strategies...</div>
      }
    </div>
  )
}
