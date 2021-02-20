import React, { FC, forwardRef, useContext, useImperativeHandle, useMemo } from 'react'
import { Form, Select } from 'antd'
import { SelectProps, SelectValue } from 'antd/es/select'
import { FormItemProps } from 'antd/es/form'
import { FieldApi, useField } from 'rjv-react'
import { FormContext, utils } from '../Form'
import { RjvFieldProps } from '../../types'

const fallbackFormContext = {
  validateTrigger: 'onChange'
}

type Props = RjvFieldProps & {
  label?: React.ReactNode;
  help?: React.ReactNode;
  placeholder?: string;
  inputProps?: SelectProps<SelectValue>;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  autoFocus?: boolean;
  validateTrigger?: 'onBlur' | 'onChange' | 'none';
  children: React.ReactNodeArray;
}

const SelectField: FC<Props> = ({
  path,
  schema,
  dependencies,
  label,
  help,
  placeholder,
  children,
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
      <Select
        ref={inputRef}
        value={field.value}
        onFocus={() => field.touched()}
        onChange={(value) => {
          if (clearStateOnChange && validateTrigger !== 'onChange' && state.isValidated) {
            field.invalidated()
          }

          field.dirty().value = value

          validateTrigger === 'onChange' && field.validate()
        }}
        onBlur={
          validateTrigger === 'onBlur'
            ? () => state.isDirty && field.validate()
            : undefined
        }
        disabled={state.isReadonly}
        placeholder={placeholder}
        autoFocus={autoFocus}
        {...inputProps}
      >
        {children}
      </Select>
    </Form.Item>
  )
}

export default forwardRef<FieldApi, Props>(SelectField)
