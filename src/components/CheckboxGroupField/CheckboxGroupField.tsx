import React, { FC, useContext, useMemo } from 'react'
import { Form, Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
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
  inputProps?: CheckboxGroupProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  validateTrigger?: 'onChange' | 'none';
  children: React.ReactNode;
}

const CheckboxGroupField: FC<Props> & { Checkbox: typeof Checkbox } = ({
  path,
  label,
  help,
  schema,
  children,
  inputProps = {},
  itemProps = {},
  clearStateOnChange = true,
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
      render={(field/* , inputRef */) => {
        return (
          <Form.Item
            label={label}
            validateStatus={utils.getValidationStatus(field)}
            help={field.messageDescription || help}
            required={field.isRequired}
            {...itemProps}
          >
            <Checkbox.Group
              // ref={inputRef}
              value={field.value}
              onChange={(value) => {
                if (clearStateOnChange && validateTrigger === 'none' && field.state.isValidated) {
                  field.markAsInvalidated()
                }

                field.markAsTouched().markAsDirty().value = value

                validateTrigger !== 'none' && field.validate()
              }}
              // disabled={field.isReadOnly}
              {...inputProps}
            >
              {children}
            </Checkbox.Group>
          </Form.Item>
        )
      }}
    />
  )
}

CheckboxGroupField.Checkbox = Checkbox

export default CheckboxGroupField
