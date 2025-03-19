import * as React from 'react'
import { Label } from '~ui/components/ui/label.js'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '~ui/components/ui/select.js'
import { StatusMessage } from '~ui/components/ui/status-message.js'

type Option = {
  label: React.ReactNode
  value: string
}

type Group = {
  label: string
  options: Array<Option>
}

type Values = Array<Option> | Array<Group>

type SelectFormProps = {
  fieldName: string
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  errorMessage?: string
  options: Values
}
export const SelectForm: React.FC<SelectFormProps> = ({
  fieldName,
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
  options
}) => (
  <div className="flex flex-1 flex-col gap-2">
    <Label htmlFor={fieldName}>{label}</Label>
    <Select
      value={value}
      onValueChange={onChange}
      name={fieldName}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => {
          if ('options' in option) {
            return (
              <SelectGroup key={option.label}>
                <SelectLabel>{option.label}</SelectLabel>
                {option.options.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            )
          }

          return (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
    {errorMessage ? (
      <StatusMessage variant="error">{errorMessage}</StatusMessage>
    ) : null}
  </div>
)
