export type NoEmpty<T> = T extends null | false | undefined ? never : T
