import {Switch} from 'antd'
import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {updateFixMsg} from '../redux'

export interface Properties {
  draftFlagIdentifierTag: number;
}

export function DraftSwitch({draftFlagIdentifierTag}: Properties) {

  const dispatch = useDispatch()

  const [isDraft, setIsDraft] = useState<boolean>(false)

  useEffect(function () {
    if (draftFlagIdentifierTag) {
      dispatch(updateFixMsg([draftFlagIdentifierTag, isDraft ? 'Y' : 'N']))
    }
  }, [isDraft, draftFlagIdentifierTag])

  return <Switch checkedChildren="draft" unCheckedChildren="final" defaultChecked={false} onChange={setIsDraft}/>
}
