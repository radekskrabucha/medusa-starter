import type {
  ProductOptionWithVariants,
  ProductVariantWithoutOptions
} from '@medusa-starter/medusa-utils/models'
import { getRouteApi, Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import type React from 'react'
import type { ProductOption } from '../validationSchemas'

const routeApi = getRouteApi('/(app)/_layout/shop/item/$handle')

type ProductOptionsProps = {
  options: Array<ProductOptionWithVariants> | null
  handle: string
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  handle
}) => {
  const query = routeApi.useSearch()

  if (!options) {
    return null
  }
  if (options.length === 0) {
    return null
  }

  return (
    <div className="flex gap-6">
      {options.map(option => (
        <Option
          key={option.id}
          option={option}
          handle={handle}
          selectedOption={
            query.options?.find(
              queryOption => queryOption.name === option.title
            ) || {
              name: option.title,
              value: option.variants[0]?.id ?? ''
            }
          }
        />
      ))}
    </div>
  )
}

type OptionProps = {
  option: ProductOptionWithVariants
  handle: string
  selectedOption: ProductOption
}

const Option: React.FC<OptionProps> = ({ option, handle, selectedOption }) => (
  <div className="flex flex-col gap-3">
    <h3 className="font-medium text-lg">{option.title}</h3>
    <div className="flex flex-wrap gap-4">
      {option.variants.map(variant => (
        <Variant
          key={variant.id}
          variant={variant}
          handle={handle}
          optionName={option.title}
          isSelected={selectedOption.value === variant.id}
        />
      ))}
    </div>
  </div>
)

type VariantProps = {
  variant: ProductVariantWithoutOptions
  handle: string
  optionName: string
  isSelected: boolean
}

const Variant: React.FC<VariantProps> = ({
  variant,
  handle,
  optionName,
  isSelected
}) => (
  <Link
    to="/shop/item/$handle"
    params={{ handle }}
    search={prevState => ({
      ...prevState,
      options: [
        {
          name: optionName,
          value: variant.id
        }
      ]
    })}
    className={cx(
      'hover:ring-primary shrink-0 cursor-pointer rounded-sm px-3 py-1 ring-2 ring-offset-2 transition-colors',
      isSelected ? 'ring-primary bg-primary/50' : 'ring-border/50 bg-border/50'
    )}
  >
    <h3 className="text-muted-foreground font-semibold">{variant.title}</h3>
  </Link>
)
