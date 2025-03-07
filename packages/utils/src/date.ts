import { getUnixTime } from 'date-fns'

export const getNow = () => new Date()

export const getFullYear = () => getNow().getFullYear()

export const getNowUnix = () => getUnixTime(getNow())
