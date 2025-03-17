import Cookies from 'js-cookie'

const secureCookie = Cookies.withAttributes({
  path: '/',
  sameSite: 'strict',
  secure: true
})

export const getItem = (key: string) => {
  return secureCookie.get(key) ?? null
}

export const setItem = (key: string, value: string, expires = 7) => {
  secureCookie.set(key, value, { expires })
}

export const removeItem = (key: string) => {
  secureCookie.remove(key)
}
