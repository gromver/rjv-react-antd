import React, { FC, useContext, useMemo } from 'react'
import { Form, Input } from 'antd'
import { InputProps } from 'antd/es/input'
import { FormItemProps } from 'antd/es/form'
import { types } from 'rjv'
import { Field } from 'rjv-react'
import { FormContext, utils } from '../Form'

const fallbackFormContext = {
  validateTrigger: 'onBlur'
}

type Props = {
  /**
   * Path to the field
   */
  path: string;
  schema: types.ISchema;
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
  label,
  help,
  schema,
  placeholder,
  inputProps = {},
  itemProps = {},
  clearStateOnChange = true,
  autoFocus = false,
  ...props
}) => {
  const formContext = useContext(FormContext) || fallbackFormContext

  const validateTrigger = useMemo(
    () => props.validateTrigger || formContext.validateTrigger,
    [formContext.validateTrigger, props.validateTrigger]
  )

  return (
    <Field
      path={path}
      schema={schema}
      render={(field, inputRef) => {
        return (
          <Form.Item
            label={label}
            validateStatus={utils.getValidationStatus(field)}
            help={field.messageDescription || help}
            required={field.state.isRequired}
            {...itemProps}
          >
            <Input
              ref={inputRef}
              value={field.value}
              onFocus={() => field.markAsTouched()}
              onChange={(e) => {
                if (clearStateOnChange && validateTrigger !== 'onChange' && field.state.isValidated) {
                  field.markAsInvalidated()
                }

                field.markAsDirty().value = e.target.value

                validateTrigger === 'onChange' && field.validate()
              }}
              onBlur={
                validateTrigger === 'onBlur'
                  ? () => field.state.isDirty && field.validate()
                  : undefined
              }
              placeholder={placeholder}
              disabled={field.state.isReadonly}
              autoFocus={autoFocus}
              {...inputProps}
            />
          </Form.Item>
        )
      }}
    />
  )
}

export default InputField
