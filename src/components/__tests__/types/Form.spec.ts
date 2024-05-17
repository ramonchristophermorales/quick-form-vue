import { describe, expect, test } from 'vitest'

import type { FormAttributes } from '@/components/types/form'

describe('Form', () => {
  const formAttributes = {
    acceptCharset: 'UTF-8',
    action: '',
    autocomplete: 'on',
    enctype: 'application/x-www-form-urlencoded',
    method: 'get',
    name: '',
    novalidate: false,
    target: '_self',
    rel: '',
    accesskey: '',
    class: '',
    contenteditable: false,
    contextmenu: '',
    dir: 'auto',
    draggable: false,
    hidden: false,
    id: '',
    lang: 'en',
    spellcheck: true,
    style: '',
    tabindex: 0,
    title: '',
    translate: 'yes',
    onSubmit: (event: Event) => {},
    onReset: (event: Event) => {},
    onBlur: (event: FocusEvent) => {},
    onChange: (event: Event) => {},
    onClick: (event: MouseEvent) => {},
    onDblClick: (event: MouseEvent) => {},
    onFocus: (event: FocusEvent) => {},
    onInput: (event: Event) => {},
    onInvalid: (event: Event) => {},
    onKeyDown: (event: KeyboardEvent) => {},
    onKeyPress: (event: KeyboardEvent) => {},
    onKeyUp: (event: KeyboardEvent) => {},
    onMouseDown: (event: MouseEvent) => {},
    onMouseMove: (event: MouseEvent) => {},
    onMouseOut: (event: MouseEvent) => {},
    onMouseOver: (event: MouseEvent) => {},
    onMouseUp: (event: MouseEvent) => {},
    onWheel: (event: WheelEvent) => {},
    'v-model': null,
    'v-if': false,
    'v-else': false,
    'v-else-if': false,
    'v-for': '',
    'v-show': true,
    'v-bind': {},
    'v-on': {},
    'v-pre': false,
    'v-cloak': false,
    'v-once': false
  }

  test('should have a string type acceptCharset', () => {
    expect(typeof formAttributes.acceptCharset).toBe('string')
  })

  test('should have a string type action', () => {
    expect(typeof formAttributes.action).toBe('string')
  })

  test('should have a string type autocomplete', () => {
    expect(typeof formAttributes.autocomplete).toBe('string')
  })

  test('should have a string type enctype', () => {
    expect(typeof formAttributes.enctype).toBe('string')
  })

  test('should have a string type method', () => {
    expect(typeof formAttributes.method).toBe('string')
  })

  test('should have a string type name', () => {
    expect(typeof formAttributes.name).toBe('string')
  })

  test('should have a boolean type novalidate', () => {
    expect(typeof formAttributes.novalidate).toBe('boolean')
  })

  test('should have a string type target', () => {
    expect(typeof formAttributes.target).toBe('string')
  })

  test('should have a string type rel', () => {
    expect(typeof formAttributes.rel).toBe('string')
  })

  test('should have a string type accesskey', () => {
    expect(typeof formAttributes.accesskey).toBe('string')
  })

  test('should have a string type class', () => {
    expect(typeof formAttributes.class).toBe('string')
  })

  test('should have a boolean type contenteditable', () => {
    expect(typeof formAttributes.contenteditable).toBe('boolean')
  })

  test('should have a string type contextmenu', () => {
    expect(typeof formAttributes.contextmenu).toBe('string')
  })

  test('should have a string type dir', () => {
    expect(typeof formAttributes.dir).toBe('string')
  })

  test('should have a boolean type draggable', () => {
    expect(typeof formAttributes.draggable).toBe('boolean')
  })

  test('should have a boolean type hidden', () => {
    expect(typeof formAttributes.hidden).toBe('boolean')
  })

  test('should have a string type id', () => {
    expect(typeof formAttributes.id).toBe('string')
  })

  test('should have a string type lang', () => {
    expect(typeof formAttributes.lang).toBe('string')
  })

  test('should have a boolean type spellcheck', () => {
    expect(typeof formAttributes.spellcheck).toBe('boolean')
  })

  test('should have a string type style', () => {
    expect(typeof formAttributes.style).toBe('string')
  })

  test('should have a number type tabindex', () => {
    expect(typeof formAttributes.tabindex).toBe('number')
  })

  test('should have a string type title', () => {
    expect(typeof formAttributes.title).toBe('string')
  })

  test('should have a string type translate', () => {
    expect(typeof formAttributes.translate).toBe('string')
  })

  test('should have a function type onSubmit', () => {
    expect(typeof formAttributes.onSubmit).toBe('function')
  })

  test('should have a function type onReset', () => {
    expect(typeof formAttributes.onReset).toBe('function')
  })

  test('should have a function type onBlur', () => {
    expect(typeof formAttributes.onBlur).toBe('function')
  })

  test('should have a function type onChange', () => {
    expect(typeof formAttributes.onChange).toBe('function')
  })

  test('should have a function type onClick', () => {
    expect(typeof formAttributes.onClick).toBe('function')
  })

  test('should have a function type onDblClick', () => {
    expect(typeof formAttributes.onDblClick).toBe('function')
  })

  test('should have a function type onFocus', () => {
    expect(typeof formAttributes.onFocus).toBe('function')
  })

  test('should have a function type onInput', () => {
    expect(typeof formAttributes.onInput).toBe('function')
  })

  test('should have a function type onInvalid', () => {
    expect(typeof formAttributes.onInvalid).toBe('function')
  })

  test('should have a function type onKeyDown', () => {
    expect(typeof formAttributes.onKeyDown).toBe('function')
  })

  test('should have a function type onKeyPress', () => {
    expect(typeof formAttributes.onKeyPress).toBe('function')
  })

  test('should have a function type onKeyUp', () => {
    expect(typeof formAttributes.onKeyUp).toBe('function')
  })

  test('should have a function type onMouseDown', () => {
    expect(typeof formAttributes.onMouseDown).toBe('function')
  })

  test('should have a function type onMouseMove', () => {
    expect(typeof formAttributes.onMouseMove).toBe('function')
  })

  test('should have a function type onMouseOut', () => {
    expect(typeof formAttributes.onMouseOut).toBe('function')
  })

  test('should have a function type onMouseOver', () => {
    expect(typeof formAttributes.onMouseOver).toBe('function')
  })

  test('should have a function type onMouseUp', () => {
    expect(typeof formAttributes.onMouseUp).toBe('function')
  })

  test('should have a function type onWheel', () => {
    expect(typeof formAttributes.onWheel).toBe('function')
  })

  test('should have a null type v-model', () => {
    expect(formAttributes['v-model']).toBeNull()
  })

  test('should have a boolean type v-if', () => {
    expect(typeof formAttributes['v-if']).toBe('boolean')
  })

  test('should have a boolean type v-else', () => {
    expect(typeof formAttributes['v-else']).toBe('boolean')
  })

  test('should have a boolean type v-else-if', () => {
    expect(typeof formAttributes['v-else-if']).toBe('boolean')
  })

  test('should have a string type v-for', () => {
    expect(typeof formAttributes['v-for']).toBe('string')
  })

  test('should have a boolean type v-show', () => {
    expect(typeof formAttributes['v-show']).toBe('boolean')
  })

  test('should have an object type v-bind', () => {
    expect(typeof formAttributes['v-bind']).toBe('object')
  })

  test('should have an object type v-on', () => {
    expect(typeof formAttributes['v-on']).toBe('object')
  })

  test('should have a boolean type v-pre', () => {
    expect(typeof formAttributes['v-pre']).toBe('boolean')
  })

  test('should have a boolean type v-cloak', () => {
    expect(typeof formAttributes['v-cloak']).toBe('boolean')
  })

  test('should have a boolean type v-once', () => {
    expect(typeof formAttributes['v-once']).toBe('boolean')
  })

  test('should enforce required properties', () => {
    const requriedFormAttribute: FormAttributes = {
      name: 'formt-test-name'
    }

    expect(requriedFormAttribute.name).toBeTypeOf('string')
  })

  test('should allow missing optional properties', () => {
    const requriedFormAttribute: FormAttributes = {
      name: 'formt-test-name'
    }

    expect(requriedFormAttribute.name).toBeTypeOf('string')
  })
})
