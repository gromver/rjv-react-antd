import React, { FC, forwardRef, useContext, useImperativeHandle, useMemo } from 'react'
import { Form, DatePicker } from 'antd'
import { DatePickerProps } from 'antd/es/date-picker'
import { FormItemProps } from 'antd/es/form'
import { FieldApi, useField } from 'rjv-react'
import { FormContext, utils } from '../Form'
import { RjvFieldProps } from '../../types'

const fallbackFormContext = {
  validateTrigger: 'onBlur'
}

type Props = RjvFieldProps & {
  label?: React.ReactNode;
  help?: React.ReactNode;
  inputProps?: DatePickerProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  autoFocus?: boolean;
  validateTrigger?: 'onBlur' | 'onChange' | 'none';
}

/**
 * HOF over Antd DatePicker component
 */
const DatePickerField: FC<Props> = ({
  path,
  schema,
  dependencies,
  label,
  help,
  inputProps = {},
  itemProps = {},
  clearStateOnChange = true,
  autoFocus = false,
  ...props
}, ref) => {
  const formContext = useContext(FormContext) || fallbackFormContext

  const validateTrigger = useMemo(
    () => props.validateTrigger || formContext.validateTrigger,
    [formContext.validateTrigger, props.validateTrigger]
  )

  const { field, state, inputRef } = useField(path, schema, dependencies)

  useImperativeHandle(ref, () => field, [field])

  return (
    <Form.Item
      label={label}
      validateStatus={utils.getValidationStatus(state)}
      help={field.messageDescription || help}
      required={state.isRequired}
      {...itemProps}
    >
      <DatePicker
        ref={inputRef}
        value={field.value}
        onFocus={() => field.touched()}
        onChange={(date) => {
          if (clearStateOnChange && validateTrigger !== 'onChange' && state.isValidated) {
            field.invalidated()
          }

          field.dirty().value = date

          validateTrigger === 'onChange' && field.validate()
        }}
        onBlur={
          validateTrigger === 'onBlur'
            ? () => state.isDirty && field.validate()
            : undefined
        }
        disabled={state.isReadonly}
        autoFocus={autoFocus}
        {...inputProps}
      />
    </Form.Item>
  )
}

export default forwardRef<FieldApi, Props>(DatePickerField)
