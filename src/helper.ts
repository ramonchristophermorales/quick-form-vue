const errorLog = (msg: string) => {
  if (typeof msg !== 'string') {
    throw new TypeError('msg must be a string')
  }

  console.error('Quick Form Vue error: ' + msg)
}

/**
 * check if the object is of type T by it's known properties
 *
 * @param obj - the object to be checked against T
 * @param knownProps - array list of known properties of the T
 */
const typeCheck = <T extends object>(obj: T, knownProps: Array<keyof T>): obj is T => {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  if (Array.isArray(knownProps) === false || knownProps.length === 0) {
    return false
  }

  const objKeys: Array<keyof T> = Object.keys(obj) as Array<keyof T>

  if (objKeys.length === 0) {
    return false
  }

  // check if the object has all the known properties
  for (const prop of knownProps) {
    if (objKeys.includes(prop) === false) {
      return false
    }
  }

  return true
}

/**
 * check if the key is of type T
 *
 * @param key - the key or property to be checked against T
 * @param props - array list of possible properties of the T
 */
const isKeyOfType = <T>(key: keyof T, props: Array<keyof T>): key is keyof T => {
  if (typeof key !== 'string') {
    return false
  }

  return props.includes(key)
}

export { errorLog, typeCheck, isKeyOfType }
