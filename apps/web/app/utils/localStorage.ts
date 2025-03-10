export const getItem = <T = string>(key: string): T | null => {
  const item = localStorage.getItem(key)

  if (!item) {
    return null
  }

  return JSON.parse(item) as T
}

export const setItem = <T>(key: string, value: T): void => {
  const item = JSON.stringify(value)

  localStorage.setItem(key, item)
}

export const removeItem = (key: string): void => {
  localStorage.removeItem(key)
}
