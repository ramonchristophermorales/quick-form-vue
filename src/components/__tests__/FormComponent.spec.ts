import { describe, expect, assert, test, vi } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'

import FormComponent from '@/components/FormComponent.vue'

import type { Config } from '@/components/types/config'
import type { TFormAttributes } from '@/components/types/form'

const configTestData: Record<string, string> = {
  action: 'action'
}

const getWrapper = <T extends { [key: string]: any } | undefined>(
  additionalProps?: T
): VueWrapper => {
  const propsData: { [key: string]: any } = { ...additionalProps }

  if (typeof additionalProps === 'object' && 'config' in additionalProps === false) {
    propsData.config = configTestData
  } else if (typeof additionalProps === 'undefined') {
    propsData.config = configTestData // default
  }

  const wrapper = shallowMount(FormComponent, {
    props: propsData
  })

  return wrapper
}

const testTFormAttributes: TFormAttributes = {
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

  test('renders form attributes', () => {
    const additionalProps = {
      config: {
        acceptCharset: 'utf-8',
        action: 'test-action-string',
        method: 'post',
        class: 'form-class'
      }
    }

    const wrapper = getWrapper(additionalProps)

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
})
