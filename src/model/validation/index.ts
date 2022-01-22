import {EditsByID, StandardFixFields} from '../index'
import {collect, hasAttr, textAttr, textContent} from '../../utility'

const debug = false

export type EditContext = {
  standardFixFields: StandardFixFields,
  fields: Record<string, any>,
  edits: EditsByID;
}

function parseLogicOperator(el: Element): (ctx: EditContext) => boolean {

  const logicOperator = textAttr(el, 'logicOperator')!
  const edits = collect(el, 'val:Edit').map(e => parseEdit(e))
  const editRefs = collect(el, 'val:EditRef').map(er => parseEditRef(er))

  function* terms(ctx: EditContext) {
    for (const edit of edits) {
      yield edit.eval(ctx)
    }
    for (const editRef of editRefs) {
      yield ctx.edits[editRef]!.eval(ctx)
    }
  }

  switch (logicOperator) {
    case 'AND':
      return (ctx: EditContext) => {
        for (let term of terms(ctx)) {
          if (!term) return false
        }
        return true
      }
    case 'OR':
      return (ctx: EditContext) => {
        for (let term of terms(ctx)) {
          if (term) return true
        }
        return false
      }
    case 'XOR':
      return (ctx: EditContext) => {
        let ok = false
        for (let term of terms(ctx)) {
          if (term) {
            if (ok) {
              return false
            } else {
              ok = true
            }
          }
        }
        return ok
      }
    case 'NOT':
      return (ctx: EditContext) => !terms(ctx).next()
    default:
      throw new Error('Unexpected logic operator: ' + logicOperator)
  }
}

function parseOperator(el: Element): (ctx: EditContext) => boolean {

  const operator = textAttr(el, 'operator')!
  const field = textAttr(el, 'field')!
  const field2 = textAttr(el, 'field2')
  const value = textAttr(el, 'value')

  if (field === null) {
    throw new Error('Attribute field is required')
  }
  if (value === null && field2 === null) {
    throw new Error('Either value or field2 are required')
  }

  return ({fields, standardFixFields}) => {

    let lhs, rhs: any

    if (field.startsWith('FIX_')) {
      lhs = standardFixFields[field] ?? null
    } else {
      lhs = fields[field]!.value
    }

    if (value !== null) {
      if (field.startsWith('FIX_')) {
        // TODO: We don't know how to parse the value unless the standard fix fields have an associated parser
        rhs = value
      } else {
        rhs = fields[field]!.converter.parse(value)
      }
    } else if (field2) {
      if (field2.startsWith('FIX_')) {
        rhs = standardFixFields[field2] ?? null
      } else {
        rhs = fields[field2]!.value
      }
    }

    switch (operator) {
      case 'EX':
        if (debug) console.log(`${field}: ${lhs} !== null`, lhs !== null)
        return lhs !== null
      case 'NX':
        if (debug) console.log(`${field}: ${lhs} === null`, lhs === null)
        return lhs === null
      case 'EQ':
        if (debug) console.log(`${field}: ${lhs} === ${rhs}`, lhs === rhs)
        return lhs === rhs
      case 'NE':
        if (debug) console.log(`${field}: ${lhs} !== ${rhs}`, lhs !== rhs)
        return lhs !== rhs
      case 'LE':
        if (debug) console.log(`${field}: ${lhs} <= ${rhs}`, lhs <= rhs)
        return lhs <= rhs
      case 'LT':
        if (debug) console.log(`${field}: ${lhs} < ${rhs}`, lhs < rhs)
        return lhs < rhs
      case 'GE':
        if (debug) console.log(`${field}: ${lhs} >= ${rhs}`, lhs >= rhs)
        return lhs >= rhs
      case 'GT':
        if (debug) console.log(`${field}: ${lhs} > ${rhs}`, lhs > rhs)
        return lhs > rhs
    }

    throw new Error('Unexpected state: either logicOperator or operator must be present')
  }
}

export type Edit = {
  id: string | null;
  description: string | null;
  eval(ctx: EditContext): boolean;
}

export function parseEdit(el: Element): Edit {
  return {
    id: textAttr(el, 'id'),
    description: textContent(el, 'Description'),
    eval: hasAttr(el, 'logicOperator') ? parseLogicOperator(el) : parseOperator(el)
  }
}

export function parseEditRef(el: Element): string {
  return textAttr(el, 'id')!
}

export type StrategyEdit = {
  description: string | null;
  validate(ctx: EditContext): string | null;
}

export function parseStrategyEdit(el: Element): StrategyEdit {

  let errorMessage = textAttr(el, 'errorMessage')!

  let edit: Edit = collect(el, 'val:Edit').map(parseEdit)[0]
  if (edit) return {
    description: textContent(el, 'Description'),
    validate(ctx) {
      return !edit.eval(ctx) ? errorMessage : null
    }
  }

  let editRef: string = collect(el, 'val:EditRef').map(er => parseEditRef(er))[0]
  if (editRef) return {
    description: textContent(el, 'Description'),
    validate(ctx) {
      let edit = ctx.edits[editRef]
      if (!edit) {
        throw new Error('Cannot find edit for ref:' + editRef)
      }
      return !edit.eval(ctx) ? errorMessage : null
    }
  }

  throw new Error('Either Edit or EditRef must be present in a StrategyEdit')
}

export function parseStrategyEdits(el: Element): StrategyEdit[] {
  return collect(el, 'StrategyEdit').map(parseStrategyEdit)
}
