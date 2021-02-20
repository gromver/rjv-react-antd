import React, { FC, forwardRef, useContext, useImperativeHandle, useMemo } from 'react'
import { Form, Input } from 'antd'
import { InputProps } from 'antd/es/input'
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
  placeholder?: string;
  inputProps?: InputProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  autoFocus?: boolean;
  validateTrigger?: 'onBlur' | 'onChange' | 'none';
}

/**
 * HOF over Antd Input component
 */
const InputField: FC<Props> = ({
  path,
  schema,
  dependencies,
  label,
  help,
  placeholder,
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
      <Input
        ref={inputRef}
        value={field.value}
        onFocus={() => field.touched()}
        onChange={(e) => {
          if (clearStateOnChange && validateTrigger !== 'onChange' && state.isValidated) {
            field.invalidated()
          }

          field.dirty().value = e.target.value

          validateTrigger === 'onChange' && field.validate()
        }}
        onBlur={
          validateTrigger === 'onBlur'
            ? () => state.isDirty && field.validate()
            : undefined
        }
        placeholder={placeholder}
        disabled={state.isReadonly}
        autoFocus={autoFocus}
        {...inputProps}
      />
    </Form.Item>
  )
}

export default forwardRef<FieldApi, Props>(InputField)
