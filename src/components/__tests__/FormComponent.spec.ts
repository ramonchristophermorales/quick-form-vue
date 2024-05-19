import { describe, expect, assert, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import FormComponent from '@/components/FormComponent.vue'

import type { Config } from '@/components/types/config'
import type { FormAttributes } from '@/components/types/form'

const configTestData = {
  action: 'action'
}

const getWrapper = (additionalProps: { [key: string]: any } = {}) => {
  const wrapper = shallowMount(FormComponent, {
    props: {
      config: { method: 'post' }, // required
      items: [{ name: 'test' }], // required if config{items} is not passed
      ...additionalProps
    }
  })

  return wrapper
}

const testFormAttributes: FormAttributes = {
  name: 'test-form-name'
}

describe('FormComponent', () => {
  test('renders form tag', () => {
    const wrapper = getWrapper()
    const form = wrapper.find('form')

    assert(form)
  })

  test('no form attributes redered if no other props or no conditional props are passed', () => {
    const wrapper = getWrapper()

    const form = wrapper.find('form')

    // check if the form element has the correct attributes
    assert.isNotOk(form.attributes('accept-charset'))
    assert.isNotOk(form.attributes('action'))
    assert.isNotOk(form.attributes('method'))
  })

  test('render default form attribute class', () => {
    const wrapper = getWrapper()

    const form = wrapper.find('form')

    const defaultClass = 'form-control'

    assert(form.attributes('class'))
    assert(form.attributes('class') === defaultClass)
  })

  test('renders form attributes', () => {
    const wrapper = getWrapper({
      acceptCharset: 'utf-8',
      action: 'test-action-string',
      method: 'post',
      class: 'form-class'
    })

    const form = wrapper.find('form')

    // check if the form element has the correct attributes
    assert(form.attributes('accept-charset'))
    assert(form.attributes('action'))
    assert(form.attributes('method'))
    assert(form.attributes('class'))
  })

  test('has config prop', () => {
    const wrapper = getWrapper()
    const props = wrapper.vm.$props

    expect(props).toHaveProperty('config')
  })

  test('should have the correct props with default values', () => {
    const props = FormComponent.props

    // Check if the props keys are correct
    expect(props).toHaveProperty('config')
    expect(props).toHaveProperty('items')

    // Check default values
    expect(props.config.default).toStrictEqual({})
    expect(props.items.default()).toStrictEqual([])

    // Check prop types
    expect(props.config.type).toBe(Object)
    expect(props.items.type).toBe(Array)
  })

  test('processConfig is a function', () => {
    const wrapper = getWrapper()
    const { processConfig } = wrapper.vm as any

    assert.isFunction(processConfig)
  })

  test('processConfig should accept 1 config argument', () => {
    const wrapper = getWrapper()
    const expectedConfig: Config = { ...configTestData }

    const { processConfig } = wrapper.vm as any

    const processConfigSpy = vi.fn(processConfig)

    processConfigSpy(expectedConfig)

    expect(processConfigSpy).toHaveBeenCalledWith(expectedConfig)
  })

  test('processConfig returns void', () => {
    const wrapper = getWrapper()
    const expectedConfig: Config = { ...configTestData }

    const { processConfig } = wrapper.vm as any

    const processConfigSpy = vi.fn(processConfig)

    processConfigSpy(expectedConfig)

    expect(processConfigSpy).toHaveReturnedWith(undefined)
  })

  test('isKeyInFormAttributes is a function', () => {
    const wrapper = getWrapper()
    const { isKeyInFormAttributes } = wrapper.vm as any

    assert.isFunction(isKeyInFormAttributes)
  })

  test('isKeyInFormAttributes accepts 2 arguments', () => {
    const wrapper = getWrapper()
    const { isKeyInFormAttributes } = wrapper.vm as any

    const testKey = 'this-key-does-not-exist'

    const isKeyInFormAttributesSpy = vi.fn(isKeyInFormAttributes)

    isKeyInFormAttributesSpy(testKey, testFormAttributes)

    expect(isKeyInFormAttributesSpy).toHaveBeenCalledWith(testKey, testFormAttributes)
  })

  test('isKeyInFormAttributes function returns false if key does not exists', () => {
    const wrapper = getWrapper()
    const { isKeyInFormAttributes } = wrapper.vm as any
    const formAttributes: FormAttributes = {}
    const testKey = 'this-key-does-not-exist'

    const isKeyInFormAttributesSpy = vi.fn(isKeyInFormAttributes)

    isKeyInFormAttributesSpy(testKey, formAttributes)

    expect(isKeyInFormAttributesSpy).toHaveReturnedWith(false)
  })

  test('isKeyInFormAttributes function returns true if key exists', () => {
    const wrapper = getWrapper()
    const { isKeyInFormAttributes } = wrapper.vm as any
    const formAttributes: FormAttributes = {}
    const testKey = 'this-key-does-not-exist'

    const isKeyInFormAttributesSpy = vi.fn(isKeyInFormAttributes)

    isKeyInFormAttributesSpy(testKey, formAttributes)

    assert.isFunction(isKeyInFormAttributes)
    expect(isKeyInFormAttributesSpy).toHaveBeenCalledWith(testKey, formAttributes)
    expect(isKeyInFormAttributesSpy).toHaveReturnedWith(false)
  })
})
