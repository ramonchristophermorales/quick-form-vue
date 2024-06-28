import { describe, expect, test, vi, assert } from 'vitest'
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

describe('InputComponent html', () => {
  test('should renders input tag', () => {
    const wrapper = getWrapper(componentAttributesTestData)

    const input = wrapper.find('input')

    expect(input)
  })

  test('no input attributes redered if no other props or no conditional props are passed', () => {
    const wrapper = getWrapper(componentAttributesTestData)

    const input = wrapper.find('input')

    assert.isNotOk(input.attributes('accept-charset'))
    assert.isNotOk(input.attributes('autocomplete'))
    assert.isNotOk(input.attributes('class'))
    assert.isNotOk(input.attributes('enctype'))
    assert.isNotOk(input.attributes('method'))
    assert.isNotOk(input.attributes('target'))
    assert.isNotOk(input.attributes('value'))
  })

  test('should renders input attributes', () => {
    const additionalProps = {
      'test-attribute': 'test-input-name',
      'data-id': 'test-input-name',
      'data-value': 'test-input-name',
      value: 'test-input-name'
    }

    const wrapper = getWrapper({
      ...componentAttributesTestData,
      ...additionalProps
    })

    const input = wrapper.find('input')

    assert.isOk(input.attributes('type'))
    assert.isOk(input.attributes('name'))
    assert.isOk(input.attributes('test-attribute'))
    assert.isOk(input.attributes('data-id'))
    assert.isOk(input.attributes('data-value'))
    assert.isOk(input.attributes('value'))

    expect(input.attributes('type')).toBe(componentAttributesTestData.type)
    expect(input.attributes('name')).toBe(componentAttributesTestData.name)
    expect(input.attributes('test-attribute')).toBe('test-input-name')
    expect(input.attributes('data-id')).toBe('test-input-name')
    expect(input.attributes('data-value')).toBe('test-input-name')
    expect(input.attributes('value')).toBe('test-input-name')
  })
})

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
