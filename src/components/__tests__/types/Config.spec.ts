import { describe, expect, test } from 'vitest'

import type { TConfig, TConfigItem } from '@/components/types/config'

describe('TConfig', () => {
  test('should have the right properties and data type', () => {
    const items: TConfigItem[] = [
      {
        name: 'name',
        tagName: 'input'
      }
    ]

    const config: TConfig = {
      action: 'action',
      acceptCharset: 'accept-charset',
      autocomplete: 'autocomplete',
      class: 'class',
      enctype: 'text/plain',
      method: 'post',
      target: 'target',
      items: items
    }

    expect(config.action).toBeTypeOf('string')
    expect(config.acceptCharset).toBeTypeOf('string')
    expect(config.autocomplete).toBeTypeOf('string')
    expect(config.class).toBeTypeOf('string')
    expect(config.enctype).toBeTypeOf('string')
    expect(config.enctype).toBeTypeOf('string')
    expect(config.method).toBeTypeOf('string')
    expect(config.target).toBeTypeOf('string')
    expect(config.items?.[0]).toMatchObject<TConfigItem>(items[0])
  })

  test('should enforce required properties', () => {
    const config: TConfig = {
      action: 'action'
    }

    expect(config.action).toBeTypeOf('string')
  })

  test('should allow missing optional properties', () => {
    const config: TConfig = {
      action: 'action',
      acceptCharset: undefined,
      autocomplete: undefined,
      class: undefined,
      enctype: undefined,
      method: undefined,
      target: undefined,
      items: undefined
    }

    expect(config.acceptCharset).toBeTypeOf('undefined')
    expect(config.autocomplete).toBeTypeOf('undefined')
    expect(config.class).toBeTypeOf('undefined')
    expect(config.enctype).toBeTypeOf('undefined')
    expect(config.enctype).toBeTypeOf('undefined')
    expect(config.method).toBeTypeOf('undefined')
    expect(config.target).toBeTypeOf('undefined')
    expect(config.items).toBeTypeOf('undefined')
  })
})
