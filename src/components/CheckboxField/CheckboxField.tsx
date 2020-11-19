import React, { FC, useContext, useMemo } from 'react'
import { Form, Checkbox } from 'antd'
import { CheckboxProps } from 'antd/es/checkbox'
import { FormItemProps } from 'antd/es/form'
import { types } from 'rjv'
import { Field } from 'rjv-react'
import { FormContext, utils } from '../Form'

const fallbackFormContext = {
  validateTrigger: 'onChange'
}

type Props = {
  path: string;
  schema: types.ISchema;
  label?: React.ReactNode;
  help?: React.ReactNode;
  inputProps?: CheckboxProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  autoFocus?: boolean;
  validateTrigger?: 'onChange' | 'none';
}

const CheckboxField: FC<Props> = ({
  path,
  label,
  help,
  schema,
  inputProps = {},
  itemProps = {},
  clearStateOnChange = true,
  autoFocus = false,
  ...props
}: Props) => {
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
            <Checkbox
              ref={inputRef}
              checked={field.value}
              onChange={(e) => {
                if (clearStateOnChange && validateTrigger === 'none' && field.state.isValidated) {
                  field.markAsInvalidated()
                }

                field.markAsTouched().markAsDirty().value = e.target.checked

                validateTrigger !== 'none' && field.validate()
              }}
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

export default CheckboxField
