import React from 'react'

export function hasAttr(el: Element, name: string): boolean {
  return el.hasAttribute(name)
}

export function textAttr(el: Element, name: string): string | null {
  let text = el.getAttribute(name)
  return text && text !== '{NULL}' ? text : null
}

export function intAttr(el: Element, name: string): number | null {
  let text = el.getAttribute(name)
  return text && text !== '{NULL}' ? parseInt(text) : null
}

export function floatAttr(el: Element, name: string): number | null {
  let text = el.getAttribute(name)
  return text && text !== '{NULL}' ? parseFloat(text) : null
}

export function parseAttr<V>(el: Element, name: string, parse: (text: string) => V): V | null {
  let text = el.getAttribute(name)
  return text && text !== '{NULL}' ? parse(text) : null
}

export function textContent(el: Element, tagName: string): string | null {
  for (const child of Array.from(el.children)) if (child.tagName === tagName) {
    return child.textContent
  }
  return null
}

export function collect(el: Element, tagName: string) {
  var children = Array.from(el.children)
  return [...children].filter(c => c.tagName === tagName)
}

export function groupBy(field: string) {
  return function (items: any, item: any) {
    items[field] = item
    return items
  }
}