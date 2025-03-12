export const getItem = (key: string) => {
  const item = localStorage.getItem(key)

  if (!item) {
    return null
  }

  return item
}

export const setItem = (key: string, value: string) =>
  localStorage.setItem(key, value)

export const removeItem = (key: string) => localStorage.removeItem(key)
