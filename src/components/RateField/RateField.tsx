import React, { FC, useContext, useMemo } from 'react'
import { Form, Rate } from 'antd'
import { RateProps } from 'antd/es/rate'
import { FormItemProps } from 'antd/es/form'
import { types } from 'rjv'
import { useField } from 'rjv-react'
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
  validateTrigger?: 'onChange' | 'none';
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

  const { field, state, inputRef } = useField(path, schema)

  return (
    <Form.Item
      label={label}
      validateStatus={utils.getValidationStatus(state)}
      help={field.messageDescription || help}
      required={state.isRequired}
      {...itemProps}
    >
      <Rate
        ref={inputRef}
        value={field.value}
        onChange={(value) => {
          if (clearStateOnChange && validateTrigger === 'none' && state.isValidated) {
            field.invalidated()
          }

          field.touched().dirty().value = value

          validateTrigger !== 'none' && field.validate()
        }}
        disabled={state.isReadonly}
        {...inputProps}
      />
    </Form.Item>
  )
}

export default RateField
