import type { StoreSearch, StoreSortOptions } from './validationSchemas'

export type IsChecked<T extends StoreSortOptions, TValue> = (
  option: T,
  value: TValue
) => boolean

export type State = StoreSearch
export type OnChangeParams<T extends StoreSortOptions, TValue> = {
  prevState: State
  checked: boolean
  value: TValue
  option: T
}
export type OnChange<T extends StoreSortOptions, TValue> = (
  params: OnChangeParams<T, TValue>
) => State
