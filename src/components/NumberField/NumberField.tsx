import React, { FC, useContext, useMemo } from 'react'
import { Form, InputNumber } from 'antd'
import { InputNumberProps } from 'antd/es/input-number'
import { FormItemProps } from 'antd/es/form'
import { types } from 'rjv'
import { Field } from 'rjv-react'
import { FormContext, utils } from '../Form'

const fallbackFormContext = {
  validateTrigger: 'onBlur'
}

type Props = {
  path: string;
  schema: types.ISchema;
  label?: React.ReactNode;
  help?: React.ReactNode;
  inputProps?: InputNumberProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  autoFocus?: boolean;
  validateTrigger?: 'onBlur' | 'onChange' | 'none';
}

const NumberField: FC<Props> = ({
  path,
  label,
  help,
  schema,
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
            required={field.isRequired}
            {...itemProps}
          >
            <InputNumber
              ref={inputRef}
              value={field.value}
              onFocus={() => field.markAsTouched()}
              onChange={(value) => {
                if (clearStateOnChange && validateTrigger !== 'onChange' && field.state.isValidated) {
                  field.markAsInvalidated()
                }

                field.markAsDirty().value = value

                validateTrigger === 'onChange' && field.validate()
              }}
              onBlur={
                validateTrigger === 'onBlur'
                  ? () => field.state.isDirty && field.validate()
                  : undefined
              }
              // disabled={field.isReadOnly}
              autoFocus={autoFocus}
              {...inputProps}
            />
          </Form.Item>
        )
      }}
    />
  )
}

export default NumberField
