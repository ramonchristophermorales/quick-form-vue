import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import FormComponent from '@/components/FormComponent.vue'

import type Config from '@/components/types/config'

const configTestData = {
  action: 'action'
}

describe('FormComponent', () => {
  it('renders form tag', () => {
    const wrapper = shallowMount(FormComponent)
    const form = wrapper.find('form')

    expect(form).toBeTruthy()
  })

  it('renders form attributes', () => {
    const wrapper = shallowMount(FormComponent)
    const form = wrapper.find('form')

    // check if the form element has the correct attributes
    expect(form.attributes('accept-charset')).toBeTruthy()
    expect(form.attributes('action')).toBeTruthy()
    expect(form.attributes('autocomplete')).toBeTruthy()
    expect(form.attributes('class')).toBeTruthy()
    expect(form.attributes('enctype')).toBeTruthy()
    expect(form.attributes('method')).toBeTruthy()
    expect(form.attributes('target')).toBeTruthy()
  })

  it('has config prop', () => {
    const wrapper = shallowMount(FormComponent)
    const props = wrapper.vm.$props

    expect(props).toHaveProperty('config')
  })

  it('config prop has the correct object items and data type', () => {
    const expectedConfig: Config = { ...configTestData }

    const wrapper = shallowMount(FormComponent, {
      props: {
        config: expectedConfig
      }
    })

    const wrapperConfig = wrapper.vm.config

    expect(wrapperConfig).toEqual(expectedConfig)

    expect(wrapperConfig).toEqual(
      expect.objectContaining({
        action: expect.any(String)
      })
    )
  })

  it('processConfig function should exists', () => {
    const wrapper = shallowMount(FormComponent)
    const { processConfig } = wrapper.vm as any

    expect(processConfig).toBeDefined()
  })

  // it.only('processConfig function should accept a config object', () => {
  //   const wrapper = shallowMount(FormComponent)
  //   const expectedConfig: Config = { ...configTestData }
  //   const { processConfig } = wrapper.vm as any

  //   processConfig(expectedConfig)

  //   expect(processConfig).toHaveBeenCalledWith(expectedConfig)
  // })
})
