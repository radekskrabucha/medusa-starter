export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value != null

export const waitFor = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const isObject = (input: unknown) => input instanceof Object
export const isArray = (input: unknown) => Array.isArray(input)
export const isEmpty = (input: unknown) => {
  if (input === null || input === undefined) {
    return true
  }

  if (input instanceof Map || input instanceof Set) {
    return input.size === 0
  }

  if (isArray(input)) {
    return (input as unknown[]).length === 0
  }

  if (typeof input === 'string') {
    return input.trim().length === 0
  }

  if (isObject(input)) {
    return Object.keys(input).length === 0
  }

  return false
}
