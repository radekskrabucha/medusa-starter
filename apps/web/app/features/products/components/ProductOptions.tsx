import type {
  ProductOption,
  ProductOptionValue
} from '@medusa-starter/medusa-utils/models'
import { Link } from '@tanstack/react-router'
import { cx } from 'class-variance-authority'
import type React from 'react'
import { handleSelectOptionParams, productPageRouteApi } from '../utils'
import type { QueryProductOption } from '../validationSchemas'

type ProductOptionsProps = {
  options: Array<ProductOption> | null
  handle: string
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  handle
}) => {
  const query = productPageRouteApi.useSearch()

  if (!options) {
    return null
  }
  if (
    options.length <= 1 &&
    options?.[0]?.values?.length &&
    options?.[0]?.values?.length <= 1
  ) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
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
              value: option.values?.[0]?.value ?? ''
            }
          }
        />
      ))}
    </div>
  )
}

type OptionProps = {
  option: ProductOption
  handle: string
  selectedOption: QueryProductOption
}

const Option: React.FC<OptionProps> = ({ option, handle, selectedOption }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-lg font-medium">{option.title}</h3>
    {option.values && option.values.length > 0 && (
      <div className="flex flex-wrap gap-4">
        {option.values?.map(optionValue => (
          <OptionValue
            key={optionValue.id}
            optionValue={optionValue}
            handle={handle}
            optionName={option.title}
            isSelected={selectedOption.value === optionValue.value}
          />
        ))}
      </div>
    )}
  </div>
)

type OptionValueProps = {
  optionValue: ProductOptionValue
  handle: string
  optionName: string
  isSelected: boolean
}

const OptionValue: React.FC<OptionValueProps> = ({
  optionValue,
  handle,
  optionName,
  isSelected
}) => (
  <Link
    to="/store/item/$handle"
    replace
    params={{ handle }}
    search={prevState =>
      handleSelectOptionParams(prevState, optionName, optionValue.value)
    }
    className={cx(
      'hover:ring-primary shrink-0 cursor-pointer rounded-sm px-3 py-1 ring-2 ring-offset-2 transition-colors',
      isSelected ? 'ring-primary bg-primary/50' : 'ring-border/50 bg-border/50'
    )}
  >
    <h3 className="text-muted-foreground font-semibold">{optionValue.value}</h3>
  </Link>
)
