import { describe, expect, assert, test, vi, beforeAll, afterAll } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'

import FormComponent from '@/components/FormComponent.vue'

import type { TConfig, TConfigItem } from '@/components/types/config'

import { warnLogPrefix } from '@/helper'

const configTestData = {
  name: 'form-test-name',
  items: [
    {
      name: 'test-input-name',
      tagName: 'input'
    }
  ]
}

const getWrapper = <T extends object | undefined>(additionalProps?: T): VueWrapper => {
  const propsData: { [key: string]: any } = {}

  propsData.config = Object.assign({}, configTestData, additionalProps) // default

  const wrapper = shallowMount(FormComponent, {
    props: propsData
  })

  return wrapper
}

describe('FormComponent init', () => {
  let consoleWarnSpy: any
  let consoleErrorSpy: any

  beforeAll(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    // Restore original implementations
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  test('should renders form tag', () => {
    const wrapper = getWrapper()

    const form = wrapper.find('form')

    expect(form)
  })

  test('no form attributes redered if no other props or no conditional props are passed', () => {
    const wrapper = getWrapper()

    const form = wrapper.find('form')

    assert.isNotOk(form.attributes('accept-charset'))
    assert.isNotOk(form.attributes('enctype'))
    assert.isNotOk(form.attributes('method'))
  })

  test('render default form attribute class', () => {
    const wrapper = getWrapper()

    const form = wrapper.find('form')

    const defaultClass = 'form-control'

    assert(form.attributes('class'))
    assert(form.attributes('class') === defaultClass)
  })

  test('should render form attributes', () => {
    const additionalProps = {
      acceptCharset: 'utf-8',
      action: 'test-action-string',
      method: 'post',
      class: 'form-class'
    }

    const wrapper = getWrapper(additionalProps)

    const form = wrapper.find('form')

    // check if the form element has the correct attributes
    expect(form.attributes('accept-charset')).toBe('utf-8')
    expect(form.attributes('action')).toBe('test-action-string')
    expect(form.attributes('method')).toBe('post')
    expect(form.attributes('class')).toBe('form-class')
  })

  test('should render unkown for attributes', () => {
    const additionalProps = {
      unknown1: 'unknown value 1',
      unknown2: 'unknown value 2'
    }

    const wrapper = getWrapper(additionalProps)

    const form = wrapper.find('form')

    expect(form.attributes('unknown1')).toBe('unknown value 1')
    expect(form.attributes('unknown2')).toBe('unknown value 2')
  })

  test('should throw TypeError if config values are not strings other than key:items', () => {
    expect(() => getWrapper({ ...configTestData, validKey1: 0 })).toThrow(TypeError)
    expect(() => getWrapper({ ...configTestData, validKey1: true })).toThrow(TypeError)
    expect(() => getWrapper({ ...configTestData, validKey1: [] })).toThrow(TypeError)
    expect(() => getWrapper({ ...configTestData, validKey1: {} })).toThrow(TypeError)
  })

  test('should console warn the unknown attributes', () => {
    const errorLogSpy = vi.spyOn(console, 'warn')

    const additionalProps = {
      validKey1: 'string',
      validKey2: 'string'
    }

    getWrapper(additionalProps)

    expect(errorLogSpy).toHaveBeenCalledWith(
      warnLogPrefix + 'Form attributes: validKey1, validKey2 are not known to the form component'
    )
  })

  test('should have config prop', () => {
    const wrapper = getWrapper()
    const props = wrapper.vm.$props

    expect(props).toHaveProperty('config')
  })
})

describe('FormComponent processConfig function', () => {
  test('should be a function', () => {
    const wrapper = getWrapper()
    const { processConfig } = wrapper.vm as any

    assert.isFunction(processConfig)
  })

  test('should accept 1 config argument', () => {
    const wrapper = getWrapper()
    const expectedConfig: TConfig = { ...configTestData }

    const { processConfig } = wrapper.vm as any

    const processConfigSpy = vi.fn(processConfig)

    processConfigSpy(expectedConfig)

    expect(processConfigSpy).toHaveBeenCalledWith(expectedConfig)
  })

  test('should throw an error if name is missing as config props', () => {
    const wrapper = getWrapper()

    const expectedConfig: TConfig = {
      items: [
        {
          tagName: 'input'
        }
      ]
    }

    const { processConfig } = wrapper.vm as any

    expect(() => processConfig(expectedConfig)).toThrow(Error)
  })

  test('should throw an error if items is missing as config props', () => {
    const wrapper = getWrapper()

    const expectedConfig: TConfig = {
      name: 'test-form-name'
    }

    const { processConfig } = wrapper.vm as any

    expect(() => processConfig(expectedConfig)).toThrow(Error)
  })

  test('should return void always', () => {
    const wrapper = getWrapper()
    const expectedConfig: TConfig = { ...configTestData }

    const { processConfig } = wrapper.vm as any

    const processConfigSpy = vi.fn(processConfig)

    processConfigSpy(expectedConfig)

    expect(processConfigSpy).toHaveReturnedWith(undefined)
  })
})

describe('FormComponent processFormItems function', () => {
  const testConfigItems: TConfigItem[] = [
    {
      tagName: 'select',
      class: 'text-class',
      id: 'text-id',
      name: 'select-name'
    },
    {
      tagName: 'input',
      type: 'text',
      name: 'input-text-name'
    }
  ]

  let consoleWarnSpy: any
  let consoleErrorSpy: any

  beforeAll(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    // Restore original implementations
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
  })

  test('should be a function', () => {
    const wrapper = getWrapper()
    const { processFormItems } = wrapper.vm as any

    assert.isFunction(processFormItems)
  })

  test('should accept 1 config item argument', () => {
    const wrapper = getWrapper()
    const expectedConfig: TConfigItem[] = [...testConfigItems]

    const { processFormItems } = wrapper.vm as any

    const processFormItemsSpy = vi.fn(processFormItems)

    processFormItemsSpy(expectedConfig)

    expect(processFormItemsSpy).toHaveBeenCalledWith(expectedConfig)
  })

  test('should return void always', () => {
    const wrapper = getWrapper()
    const expectedConfig: TConfigItem[] = [...testConfigItems]

    const { processFormItems } = wrapper.vm as any

    const processFormItemsSpy = vi.fn(processFormItems)

    processFormItemsSpy(expectedConfig)

    expect(processFormItemsSpy).toHaveReturnedWith(undefined)
  })

  test('should throw an error if name form item property is invalid', () => {
    const wrapper = getWrapper()

    const expectedConfigItem = {
      name: 'test-name'
    }

    const { processFormItems } = wrapper.vm as any

    expect(() => processFormItems(expectedConfigItem)).toThrow()
  })

  test('should throw an error if tagName form item property is invalid', () => {
    const wrapper = getWrapper()

    const expectedConfigItem = {
      tagName: 'test-name'
    }

    const { processFormItems } = wrapper.vm as any

    expect(() => processFormItems(expectedConfigItem)).toThrow()
  })
})
