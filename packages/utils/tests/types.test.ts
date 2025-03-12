import { describe, it, expectTypeOf } from 'vitest'
import type {
  NoEmpty,
  StringWithAutoCompleteOptions,
  ArrayElementType
} from '../src/types'

describe('type utils', () => {
  describe('NoEmpty', () => {
    it('should exclude null, undefined, and false', () => {
      type Test = NoEmpty<string | null | undefined | false | number>
      type ExpectedType = string | number
      expectTypeOf<Test>().toEqualTypeOf<ExpectedType>()
    })

    it('should preserve other types', () => {
      type Test = NoEmpty<string | number | true | object>
      type ExpectedType = string | number | true | object
      expectTypeOf<Test>().toEqualTypeOf<ExpectedType>()
    })
  })

  describe('StringWithAutoCompleteOptions', () => {
    it('should allow both string literal and string type', () => {
      type Options = 'option1' | 'option2'
      type Test = StringWithAutoCompleteOptions<Options>

      const literalOption: Test = 'option1'
      const otherString: Test = 'any string'

      expectTypeOf(literalOption).toBeString()
      expectTypeOf(otherString).toBeString()
    })
  })

  describe('ArrayElementType', () => {
    it('should extract element type from array', () => {
      type StringArray = string[]
      type NumberArray = Array<number>
      type MixedArray = (string | number)[]
      type ReadonlyArray = readonly string[]

      type StringElement = ArrayElementType<StringArray>
      type NumberElement = ArrayElementType<NumberArray>
      type MixedElement = ArrayElementType<MixedArray>
      type ReadonlyElement = ArrayElementType<ReadonlyArray>

      expectTypeOf<StringElement>().toEqualTypeOf<string>()
      expectTypeOf<NumberElement>().toEqualTypeOf<number>()
      expectTypeOf<MixedElement>().toEqualTypeOf<string | number>()
      expectTypeOf<ReadonlyElement>().toEqualTypeOf<string>()
    })

    it('should not accept non-array types', () => {
      expectTypeOf<ArrayElementType<string>>().toBeNever()
      expectTypeOf<ArrayElementType<number>>().toBeNever()
      expectTypeOf<ArrayElementType<object>>().toBeNever()
    })
  })
})
