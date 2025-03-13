import { atom } from 'jotai'
import type { CheckoutStep } from '../types'

export const checkoutStepAtom = atom<CheckoutStep>('address')
