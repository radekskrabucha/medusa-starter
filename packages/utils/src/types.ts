export type NoEmpty<T> = T extends null | false | undefined ? never : T

export type StringWithAutoCompleteOptions<T extends string> = (string & {}) | T

export type ArrayElementType<T> = T extends readonly (infer U)[] ? U : never
