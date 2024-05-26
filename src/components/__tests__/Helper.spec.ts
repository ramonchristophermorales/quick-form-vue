import { describe, expect, test, vi, beforeAll, afterAll } from 'vitest'

import { errorLog, typeCheck, isKeyOfType } from '@/helper'

describe('Helper errorLog function', () => {
  const testErrorMessage: string = 'test error message'

  let consoleErrorSpy: any

  beforeAll(() => {
    // Mock console.error and console.log
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    // Restore original implementations
    consoleErrorSpy.mockRestore()
  })

  test('should be a function', () => {
    expect(errorLog).toBeTypeOf('function')
  })

  test('should throw a TypeError if argument msg is not a string', () => {
    expect(() => errorLog(0 as any)).toThrow(TypeError)
    expect(() => errorLog(123 as any)).toThrow(TypeError)
    expect(() => errorLog(true as any)).toThrow(TypeError)
    expect(() => errorLog({} as any)).toThrow(TypeError)
    expect(() => errorLog([] as any)).toThrow(TypeError)
  })

  test('should accept argument msg as string', () => {
    expect(() => errorLog(testErrorMessage)).not.toThrow()
  })

  test('should call console.error', () => {
    const testConsoleErrorMessage: string = 'Quick Form Vue error: ' + testErrorMessage

    const errorLogSpy = vi.spyOn(console, 'error')

    errorLog(testErrorMessage)

    expect(errorLogSpy).toHaveBeenCalledWith(testConsoleErrorMessage)
  })

  test('should return void', () => {
    expect(errorLog(testErrorMessage)).toBeUndefined()
  })
})

describe('Helper typeCheck function', () => {
  type TestType = {
    string: string
    number: number
    object: object
    stringOptional?: string
  }

  const testObjSuccess: TestType = {
    string: 'string',
    number: 0,
    object: {}
  }
  const testObjSFail: any = {
    string1: 'string',
    number2: 0,
    object3: {}
  }

  const testKnownProps: (keyof TestType)[] = ['string', 'number', 'object']
  const testUnknownProps: string[] = ['unknown'] as any

  test('should be a function', () => {
    expect(typeCheck).toBeTypeOf('function')
  })

  test('should accept argument obj as object', () => {
    const typeCheckSpy = vi.fn(typeCheck)

    typeCheckSpy(testObjSuccess, [] as any)
    expect(typeCheckSpy).toHaveBeenCalledWith(testObjSuccess, [])
  })

  test('should accept argument knownProps as array', () => {
    const typeCheckSpy = vi.fn(typeCheck)

    typeCheckSpy({} as any, testUnknownProps)
    expect(typeCheckSpy).toHaveBeenCalledWith({}, testUnknownProps)
  })

  test('should return false if argument obj is not of type T', () => {
    expect(typeCheck<TestType>(123 as any, testKnownProps)).toBe(false)
    expect(typeCheck<TestType>(true as any, testKnownProps)).toBe(false)
    expect(typeCheck<TestType>([] as any, testKnownProps)).toBe(false)
    expect(typeCheck<TestType>(testObjSFail, testKnownProps)).toBe(false)
  })

  test('should return false if argument knownProps is not an array', () => {
    expect(typeCheck<TestType>(testObjSuccess, 123 as any)).toBe(false)
    expect(typeCheck<TestType>(testObjSuccess, true as any)).toBe(false)
    expect(typeCheck<TestType>(testObjSuccess, testObjSFail as any)).toBe(false)
  })

  test('should return true if argument obj is of type T and argument knownProps is valid', () => {
    expect(typeCheck<TestType>(testObjSuccess, testKnownProps)).toBe(true)
  })
})

describe('Helper isKeyOfType function', () => {
  type TestType = {
    string: string
    number: number
    object: object
  }

  const validKey: keyof TestType = 'string'
  const invalidKey: string = 'invalid-key'

  const validProps: (keyof TestType)[] = ['string', 'number']
  const inValidProps = ['invalid-key', 'invalid-key-2']

  test('should be a function', () => {
    expect(isKeyOfType).toBeTypeOf('function')
  })

  test('should return false if argument key is not string', () => {
    expect(isKeyOfType(0 as any, validProps)).toBe(false)
    expect(isKeyOfType(true as any, validProps)).toBe(false)
    expect(isKeyOfType([] as any, validProps)).toBe(false)
    expect(isKeyOfType({} as any, validProps)).toBe(false)
  })

  test('should accept argument key as string', () => {
    const isKeyOfTypeSpy = vi.fn(isKeyOfType)

    isKeyOfTypeSpy(validKey as never, validProps as never)

    expect(isKeyOfTypeSpy).toHaveBeenCalledWith(validKey, validProps)
  })

  test('should accept argument key as string', () => {
    const isKeyOfTypeSpy = vi.fn(isKeyOfType)

    isKeyOfTypeSpy(validKey as never, [] as never)

    expect(isKeyOfTypeSpy).toHaveBeenCalledWith(validKey, [])
  })

  test('should accept argument props as array', () => {
    const isKeyOfTypeSpy = vi.fn(isKeyOfType)

    isKeyOfTypeSpy(validKey as never, validProps as never)

    expect(isKeyOfTypeSpy).toHaveBeenCalledWith(validKey, validProps)
  })

  test('should return false if argument props is not an array', () => {
    expect(isKeyOfType<TestType>(validKey, '' as any)).toBe(false)
    expect(isKeyOfType<TestType>(validKey, 123 as any)).toBe(false)
    expect(isKeyOfType<TestType>(validKey, {} as any)).toBe(false)
    expect(isKeyOfType<TestType>(validKey, null as any)).toBe(false)
  })

  test('should return false if key is invalid', () => {
    expect(isKeyOfType<TestType>(invalidKey as any, validProps)).toBe(false)
  })

  test('should return false if props is invalid', () => {
    expect(isKeyOfType<TestType>(validKey, inValidProps as any)).toBe(false)
  })

  test('should return true if key is valid and props is valid and key is in props', () => {
    expect(isKeyOfType<TestType>(validKey, validProps)).toBe(true)
  })
})
