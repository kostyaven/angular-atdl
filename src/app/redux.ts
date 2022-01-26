import {combineReducers, configureStore, createAction, createReducer} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {ControlsByID, EditsByID, FixMessage, ParametersByName, StandardFixFields} from './model'
import {collect, intAttr, textAttr} from './utility'
import {parseParameter} from './model/types'
import {parseControl} from './model/controls'
import {parseEdit} from './model/validation'

export const loadStandardFixFields = createAction<StandardFixFields>('LOAD_STANDARD_FIX_FIELDS')
export const selectStrategy = createAction<Element>('SELECT_STRATEGY')
export const updateFixMsg = createAction<[number, any]>('UPDATE_FIX_MSG')
export const updateParameter = createAction<[string, any]>('UPDATE_PARAMETER')
export const updateControl = createAction<[string, any]>('UPDATE_CONTROL')

export const fixMsg = createReducer({} as FixMessage, builder => builder
  .addCase(selectStrategy, (fixMsg, {payload: strategy}) => {

    let strategyIdentifierTag = intAttr(strategy.parentElement!, 'strategyIdentifierTag')!
    fixMsg[strategyIdentifierTag] = textAttr(strategy, 'wireValue')!

    let versionIdentifierTag = intAttr(strategy.parentElement!, 'versionIdentifierTag')
    if (versionIdentifierTag) {
      fixMsg[versionIdentifierTag] = textAttr(strategy, 'version')!
    }
  })
  .addCase(updateFixMsg, (fixMsg, {payload: [field, value]}) => {
    fixMsg[field] = value
  })
)

export const standardFixFields = createReducer({} as StandardFixFields, builder => builder
  .addCase(loadStandardFixFields, (standardFixFields, {payload}) => {
    Object.assign(standardFixFields, payload)
  })
)

export const parameters = createReducer({} as ParametersByName, builder => builder
  .addCase(selectStrategy, (parameters, {payload: strategy}) => {
    for (const parameterElement of Array.from(strategy.querySelectorAll('Parameter'))) {
      let parameter = parseParameter(parameterElement)
      parameters[parameter.name] = parameter
    }
  })
  .addCase(updateParameter, (parametrs, {payload: [name, value]}) => {
    parametrs[name]!.value = value
  })
)

export const controls = createReducer({} as ControlsByID, builder => builder
  .addCase(selectStrategy, (controls, {payload: strategy}) => {
    for (const controlElement of Array.from(strategy.querySelectorAll('Control'))) {
      let control = parseControl(controlElement)
      controls[control.ID] = control
    }
  })
  .addCase(updateControl, (controls, {payload: [ID, value]}) => {
    controls[ID]!.value = value
  })
)

export const edits = createReducer({} as EditsByID, builder => builder
  .addCase(selectStrategy, (edits, {payload: strategy}) => {
    for (const edit of collect(strategy.parentElement!, 'val:Edit').map(parseEdit)) {
      if (edit.id) {
        edits[edit.id] = edit
      }
    }
    for (const edit of collect(strategy, 'val:Edit').map(parseEdit)) {
      if (edit.id) {
        edits[edit.id] = edit
      }
    }
  })
)

export const fixAtdl = combineReducers({
  fixMsg,
  standardFixFields,
  parameters,
  controls,
  edits
})

export type FIXAtdlState = ReturnType<typeof fixAtdl>

export const store = configureStore({
  reducer: fixAtdl,
  middleware: [thunk, createLogger({collapsed: true})]
})

