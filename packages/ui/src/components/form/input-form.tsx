import React from 'react'
import { Input, type InputProps } from '../ui/input.js'
import { Label } from '../ui/label.js'
import { StatusMessage } from '../ui/status-message.js'

type InputFormProps = {
  fieldName: string
  label: string
  value: InputProps['value']
  onChange: InputProps['onChange']
  onBlur: InputProps['onBlur']
  placeholder: InputProps['placeholder']
  disabled: InputProps['disabled']
  type?: InputProps['type']
  errorMessage?: string
}

export const InputForm: React.FC<InputFormProps> = ({
  fieldName,
  label,
  value,
  onBlur,
  onChange,
  disabled,
  placeholder,
  type = 'text',
  errorMessage
}) => (
  <div className="flex flex-1 flex-col gap-2">
    <Label htmlFor={fieldName}>{label}</Label>
    <Input
      id={fieldName}
      type={type}
      name={fieldName}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      disabled={disabled}
    />
    {errorMessage ? (
      <StatusMessage variant="error">{errorMessage}</StatusMessage>
    ) : null}
  </div>
)
