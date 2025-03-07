export type NoEmpty<T> = T extends null | false | undefined ? never : T

export type StringWithAutoCompleteOptions<T extends string> = (string & {}) | T
