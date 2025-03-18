import { getUnixTime, format } from 'date-fns'

export const getNow = () => new Date()

export const getFullYear = () => getNow().getFullYear()

export const formatDate = (date: string | Date) => {
  return format(new Date(date), 'MMMM d, yyyy')
}

export const formatDateTime = (date: string | Date) => {
  return format(new Date(date), 'MMMM d, yyyy • HH:mm')
}

export const getNowUnix = () => getUnixTime(getNow())
