import { describe, expect, assert, test, vi, beforeAll, afterAll } from 'vitest'
import { shallowMount, VueWrapper } from '@vue/test-utils'

import InputComponent from '@/components/InputComponent.vue'

const componentAttributesTestData = {
  type: 'text',
  name: 'test-input-name'
}

const getWrapper = <T extends object | undefined>(additionalProps?: T): VueWrapper => {
  const propsData: { [key: string]: any } = {}

  propsData.componentAttributes = Object.assign({}, additionalProps ?? {}) // default

  const wrapper = shallowMount(InputComponent, {
    props: propsData
  })

  return wrapper
}

describe('InputComponent validateName', () => {
  test('should return void', () => {
    const wrapper = getWrapper(componentAttributesTestData)

    const { validateName } = wrapper.vm as any

    const validateNameSpy = vi.fn(validateName)

    validateNameSpy()

    expect(validateNameSpy).toHaveReturnedWith(undefined)
  })

  test('should throw error if name is not defined', () => {
    expect(() => getWrapper({ type: 'text' })).toThrow()
  })

  test('should throw type error if name is not string', () => {
    expect(() => getWrapper({ type: 'text', name: 0 })).toThrow(TypeError)
    expect(() => getWrapper({ type: 'text', name: true })).toThrow(TypeError)
    expect(() => getWrapper({ type: 'text', name: ['test'] })).toThrow(TypeError)
    expect(() => getWrapper({ type: 'text', name: {} })).toThrow(TypeError)
  })

  test('should not throw any error if name is valid', () => {
    expect(() => getWrapper({ type: 'text', name: 'test' })).not.toThrow()
  })
})

describe('InputComponent validateType', () => {
  test('should return void', () => {
    const wrapper = getWrapper(componentAttributesTestData)

    const { validateType } = wrapper.vm as any

    const validateTypeSpy = vi.fn(validateType)

    validateTypeSpy()

    expect(validateTypeSpy).toHaveReturnedWith(undefined)
  })

  test('should throw error if type is not defined', () => {
    expect(() => getWrapper({ name: 'text' })).toThrow()
  })

  test('should throw type error if type is not string', () => {
    expect(() => getWrapper({ name: 'text', type: 0 })).toThrow(TypeError)
    expect(() => getWrapper({ name: 'text', type: true })).toThrow(TypeError)
    expect(() => getWrapper({ name: 'text', type: ['test'] })).toThrow(TypeError)
    expect(() => getWrapper({ name: 'text', type: {} })).toThrow(TypeError)
  })

  test('should throw error if type is not valid', () => {
    expect(() => getWrapper({ name: 'text', type: 'text1' })).toThrow(Error)
    expect(() => getWrapper({ name: 'text', type: 'random text' })).toThrow(Error)
    expect(() => getWrapper({ name: 'text', type: 'radio-' })).toThrow(Error)
  })

  test('should not throw any error if type is valid', () => {
    expect(() => getWrapper({ name: 'text', type: 'text' })).not.toThrow()
    expect(() => getWrapper({ name: 'text', type: 'radio' })).not.toThrow()
    expect(() => getWrapper({ name: 'text', type: 'checkbox' })).not.toThrow()
    expect(() => getWrapper({ name: 'text', type: 'date' })).not.toThrow()
    expect(() => getWrapper({ name: 'text', type: 'file' })).not.toThrow()
  })
})
