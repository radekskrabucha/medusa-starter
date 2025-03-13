import { atom } from 'jotai'
import type { ProviderId } from '../types'

export const paymentProviderIdAtom = atom<ProviderId | null>(null)
