import { describe, expect, assert, test, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import FormComponent from '@/components/FormComponent.vue'

import type { Config } from '@/components/types/config'

const configTestData = {
  action: 'action'
}

describe('FormComponent', () => {
  test('renders form tag', () => {
    const wrapper = shallowMount(FormComponent)
    const form = wrapper.find('form')

    assert(form)
  })

  test('renders form attributes', () => {
    const wrapper = shallowMount(FormComponent)
    const form = wrapper.find('form')

    // check if the form element has the correct attributes
    assert(form.attributes('accept-charset'))
    assert(form.attributes('action'))
    assert(form.attributes('autocomplete'))
    assert(form.attributes('class'))
    assert(form.attributes('enctype'))
    assert(form.attributes('method'))
    assert(form.attributes('target'))
  })

  test('has config prop', () => {
    const wrapper = shallowMount(FormComponent)
    const props = wrapper.vm.$props

    expect(props).toHaveProperty('config')
  })

  test('config prop has the correct object items and data type', () => {
    const expectedConfig: Config = { ...configTestData }

    const wrapper = shallowMount(FormComponent, {
      props: {
        config: expectedConfig
      }
    })

    const wrapperConfig = wrapper.vm.config

    assert.isObject(wrapperConfig)
    expect(wrapperConfig).toEqual(expectedConfig)

    expect(wrapperConfig).toEqual(
      expect.objectContaining({
        action: expect.any(String)
      })
    )
  })

  test('processConfig function should exists', () => {
    const wrapper = shallowMount(FormComponent)
    const { processConfig } = wrapper.vm as any

    expect(processConfig).toBeDefined()
  })

  test('processConfig function should accept a config object', () => {
    const wrapper = shallowMount(FormComponent)
    const expectedConfig: Config = { ...configTestData }

    const { processConfig } = wrapper.vm as any

    assert.isFunction(processConfig)

    const spyFn = {
      processConfig: vi.fn()
    }

    const processConfigSpy = vi.spyOn(spyFn, 'processConfig')

    spyFn.processConfig(expectedConfig)

    expect(processConfigSpy).toHaveBeenCalledWith(expectedConfig)
  })
})
