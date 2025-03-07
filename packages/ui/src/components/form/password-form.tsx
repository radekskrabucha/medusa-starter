import React from 'react'
import { PasswordInput, type InputProps } from '../ui/input.js'
import { Label } from '../ui/label.js'
import { StatusMessage } from '../ui/status-message.js'

type PasswordInputProps = {
  fieldName: string
  label: string
  value: InputProps['value']
  onChange: InputProps['onChange']
  onBlur: InputProps['onBlur']
  placeholder?: InputProps['placeholder']
  disabled: InputProps['disabled']
  errorMessage?: string
}

export const PasswordInputForm: React.FC<PasswordInputProps> = ({
  fieldName,
  label,
  value,
  onBlur,
  onChange,
  placeholder,
  disabled,
  errorMessage
}) => (
  <div className="flex flex-1 flex-col gap-2">
    <Label htmlFor={fieldName}>{label}</Label>
    <PasswordInput
      id={fieldName}
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
