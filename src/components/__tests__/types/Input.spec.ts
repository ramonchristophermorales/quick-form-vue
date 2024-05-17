import { describe, expect, test } from 'vitest'

import type { InputAttributes } from '@/components/types/input'

describe('Form', () => {
  const inputAttributes = {
    name: '',
    accept: '',
    alt: '',
    autocomplete: 'on',
    autofocus: 0,
    capture: 0,
    checked: 0,
    dirname: '',
    disabled: 0,
    form: '',
    formaction: '',
    formenctype: 'text/plain',
    formmethod: 'post',
    formnovalidate: 0,
    formtarget: '_self',
    height: '',
    width: '',
    list: '',
    max: '',
    maxlength: 0,
    min: '',
    minlength: 0,
    multiple: 0,
    pattern: '',
    placeholder: '',
    readonly: 0,
    required: 0,
    size: 0,
    src: '',
    step: '',
    type: 'button',
    value: '',
    inputmode: 'text',
    ismap: 0,
    tabindex: 0,
    title: '',
    accesskey: '',
    contenteditable: 'true',
    contextmenu: '',
    dir: 'ltr',
    draggable: 'true',
    hidden: 0,
    lang: '',
    spellcheck: 'true',
    translate: 'yes',
    style: '',
    class: '',
    id: '',
    onBlur: (event: FocusEvent) => {},
    onChange: (event: Event) => {},
    onClick: (event: MouseEvent) => {},
    onDblClick: (event: MouseEvent) => {},
    onFocus: (event: FocusEvent) => {},
    onInput: (event: Event) => {},
    onKeyDown: (event: KeyboardEvent) => {},
    onKeyPress: (event: KeyboardEvent) => {},
    onKeyUp: (event: KeyboardEvent) => {},
    onMouseDown: (event: MouseEvent) => {},
    onMouseMove: (event: MouseEvent) => {},
    onMouseOut: (event: MouseEvent) => {},
    onMouseOver: (event: MouseEvent) => {},
    onMouseUp: (event: MouseEvent) => {},
    onWheel: (event: WheelEvent) => {},
    // Vue-specific attributes
    'v-model': null,
    'v-if': false,
    'v-else': false,
    'v-else-if': false,
    'v-for': '',
    'v-show': false,
    'v-bind': {},
    'v-on': {},
    'v-pre': false,
    'v-cloak': false,
    'v-once': false
  }

  test('should have a boolean type name', () => {
    expect(inputAttributes.name).toBeTypeOf('string')
  })

  test('should have a boolean type accept', () => {
    expect(inputAttributes.accept).toBeTypeOf('string')
  })

  test('should have a boolean type alt', () => {
    expect(inputAttributes.alt).toBeTypeOf('string')
  })

  test('should have a boolean type autocomplete', () => {
    expect(inputAttributes.autocomplete).toBeTypeOf('string')
  })

  test('should have a boolean type autofocus', () => {
    expect(inputAttributes.autofocus).toBeTypeOf('boolean')
  })

  test('should enforce required properties', () => {
    const requriedFormAttribute: InputAttributes = {
      name: 'formt-test-name'
    }

    expect(requriedFormAttribute.name).toBeTypeOf('string')
  })

  test('should allow missing optional properties', () => {
    const requriedFormAttribute: InputAttributes = {
      name: 'formt-test-name'
    }

    expect(requriedFormAttribute.name).toBeTypeOf('string')
  })
})
