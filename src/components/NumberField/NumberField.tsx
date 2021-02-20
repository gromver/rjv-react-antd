import React, { FC, forwardRef, useContext, useImperativeHandle, useMemo } from 'react'
import { Form, InputNumber } from 'antd'
import { InputNumberProps } from 'antd/es/input-number'
import { FormItemProps } from 'antd/es/form'
import { FieldApi, useField } from 'rjv-react'
import { FormContext, utils } from '../Form'
import { RjvFieldProps } from '../../types'

const fallbackFormContext = {
  validateTrigger: 'onBlur'
}

type Props = RjvFieldProps & {
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
      <InputNumber
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
        autoFocus={autoFocus}
        {...inputProps}
      />
    </Form.Item>
  )
}

export default forwardRef<FieldApi, Props>(NumberField)
