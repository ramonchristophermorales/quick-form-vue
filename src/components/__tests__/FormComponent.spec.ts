import { describe, expect, assert, test, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'

import FormComponent from '@/components/FormComponent.vue'

import type { Config, ConfigItem } from '@/components/types/config'
import type { TFormAttributes } from '@/components/types/form'

const configTestData: Config = {
  name: 'form-test-name',
  items: [] as ConfigItem[]
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
  test('should renders form tag', () => {
    const wrapper = getWrapper()
    const form = wrapper.find('form')

    assert(form)
  })

  test('no form attributes redered if no other props or no conditional props are passed', () => {
    const wrapper = getWrapper()

    const form = wrapper.find('form')

    // check if the form element has the correct attributes
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
    assert(form.attributes('accept-charset'))
    assert(form.attributes('action'))
    assert(form.attributes('method'))
    assert(form.attributes('class'))
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
    const expectedConfig: Config = { ...configTestData }

    const { processConfig } = wrapper.vm as any

    const processConfigSpy = vi.fn(processConfig)

    processConfigSpy(expectedConfig)

    expect(processConfigSpy).toHaveBeenCalledWith(expectedConfig)
  })

  test('should return void always', () => {
    const wrapper = getWrapper()
    const expectedConfig: Config = { ...configTestData }

    const { processConfig } = wrapper.vm as any

    const processConfigSpy = vi.fn(processConfig)

    processConfigSpy(expectedConfig)

    expect(processConfigSpy).toHaveReturnedWith(undefined)
  })
})
