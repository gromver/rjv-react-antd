import React, { FC, useContext, useMemo, forwardRef, useImperativeHandle } from 'react'
import { Form, Checkbox } from 'antd'
import { CheckboxProps } from 'antd/es/checkbox'
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
  inputProps?: CheckboxProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  autoFocus?: boolean;
  validateTrigger?: 'onChange' | 'none';
}

const CheckboxField: FC<Props> = ({
  path,
  schema,
  dependencies,
  label,
  help,
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
      <Checkbox
        ref={inputRef}
        checked={field.value}
        onChange={(e) => {
          if (clearStateOnChange && validateTrigger === 'none' && state.isValidated) {
            field.invalidated()
          }

          field.touched().dirty().value = e.target.checked

          validateTrigger !== 'none' && field.validate()
        }}
        disabled={state.isReadonly}
        autoFocus={autoFocus}
        {...inputProps}
      />
    </Form.Item>
  )
}

export default forwardRef<FieldApi, Props>(CheckboxField)
