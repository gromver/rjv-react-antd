import React, { FC, useContext, useMemo } from 'react'
import { Form, Radio } from 'antd'
import { RadioGroupProps } from 'antd/es/radio'
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
  inputProps?: RadioGroupProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  validateTrigger?: 'onChange' | 'none';
  children: React.ReactNode;
}

const RadioGroupField: FC<Props> = ({
  path,
  label,
  help,
  schema,
  children,
  inputProps = {},
  itemProps = {},
  clearStateOnChange = true,
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
            <Radio.Group
              ref={inputRef}
              value={field.value}
              onChange={(e) => {
                if (clearStateOnChange && validateTrigger === 'none' && field.state.isValidated) {
                  field.markAsInvalidated()
                }

                field.markAsTouched().markAsDirty().value = e.target.value

                validateTrigger !== 'none' && field.validate()
              }}
              disabled={field.isReadonly}
              {...inputProps}
            >
              {children}
            </Radio.Group>
          </Form.Item>
        )
      }}
    />
  )
}

export default RadioGroupField
