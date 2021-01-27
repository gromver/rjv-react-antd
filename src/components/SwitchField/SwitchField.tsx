import React, { FC, useContext, useMemo } from 'react'
import { Form, Switch } from 'antd'
import { SwitchProps } from 'antd/es/switch'
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
  inputProps?: SwitchProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  autoFocus?: boolean;
  validateTrigger?: 'onChange' | 'none';
}

const SwitchField: FC<Props> = ({
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

  const { field, state, inputRef } = useField(path, schema)

  return (
    <Form.Item
      label={label}
      validateStatus={utils.getValidationStatus(state)}
      help={field.messageDescription || help}
      required={state.isRequired}
      {...itemProps}
    >
      <Switch
        ref={inputRef}
        checked={field.value}
        onChange={(value) => {
          if (clearStateOnChange && validateTrigger === 'none' && state.isValidated) {
            field.invalidated()
          }

          field.touched().dirty().value = value

          validateTrigger !== 'none' && field.validate()
        }}
        disabled={state.isReadonly}
        autoFocus={autoFocus}
        {...inputProps}
      />
    </Form.Item>
  )
}

export default SwitchField
