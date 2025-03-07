import React from 'react'
import { Checkbox, type CheckboxProps } from '../ui/checkbox.js'
import { Label } from '../ui/label.js'
import { StatusMessage } from '../ui/status-message.js'

type CheckboxFormProps = {
  fieldName: string
  label: string
  checked: CheckboxProps['checked']
  onCheckedChange: CheckboxProps['onCheckedChange']
  onBlur: CheckboxProps['onBlur']
  disabled: CheckboxProps['disabled']
  errorMessage?: string
}

export const CheckboxForm: React.FC<CheckboxFormProps> = ({
  fieldName,
  label,
  checked,
  onBlur,
  onCheckedChange,
  disabled,
  errorMessage
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-2">
      <Checkbox
        id={fieldName}
        name={fieldName}
        checked={checked}
        onCheckedChange={onCheckedChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      <Label htmlFor={fieldName}>{label}</Label>
    </div>
    {errorMessage ? (
      <StatusMessage variant="error">{errorMessage}</StatusMessage>
    ) : null}
  </div>
)
