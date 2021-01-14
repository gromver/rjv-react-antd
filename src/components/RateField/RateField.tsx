import React, { FC, useContext, useMemo } from 'react'
import { Form, Rate } from 'antd'
import { RateProps } from 'antd/es/rate'
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
  inputProps?: RateProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  validateTrigger?: 'onBlur' | 'onChange' | 'none';
}

const RateField: FC<Props> = ({
  path,
  label,
  help,
  schema,
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
            required={field.state.isRequired}
            {...itemProps}
          >
            <Rate
              ref={inputRef}
              value={field.value}
              onChange={(value) => {
                if (clearStateOnChange && validateTrigger === 'none' && field.state.isValidated) {
                  field.markAsInvalidated()
                }

                field.markAsTouched().markAsDirty().value = value

                validateTrigger !== 'none' && field.validate()
              }}
              disabled={field.state.isReadonly}
              {...inputProps}
            />
          </Form.Item>
        )
      }}
    />
  )
}

export default RateField
