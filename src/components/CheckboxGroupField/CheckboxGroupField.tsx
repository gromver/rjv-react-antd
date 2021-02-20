import React, { FC, useContext, useMemo, forwardRef, useImperativeHandle } from 'react'
import { Form, Checkbox } from 'antd'
import { CheckboxGroupProps } from 'antd/es/checkbox'
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
  inputProps?: CheckboxGroupProps;
  itemProps?: FormItemProps;
  clearStateOnChange?: boolean;
  validateTrigger?: 'onChange' | 'none';
  children: React.ReactNodeArray;
}

const CheckboxGroupField: FC<Props> = ({
  path,
  schema,
  dependencies,
  label,
  help,
  children,
  inputProps = {},
  itemProps = {},
  clearStateOnChange = true,
  ...props
}, ref) => {
  const formContext = useContext(FormContext) || fallbackFormContext

  const validateTrigger = useMemo(
    () => props.validateTrigger || formContext.validateTrigger,
    [formContext.validateTrigger, props.validateTrigger]
  )

  const { field, state } = useField(path, schema, dependencies)

  useImperativeHandle(ref, () => field, [field])

  return (
    <Form.Item
      label={label}
      validateStatus={utils.getValidationStatus(state)}
      help={field.messageDescription || help}
      required={state.isRequired}
      {...itemProps}
    >
      <Checkbox.Group
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
      >
        {children}
      </Checkbox.Group>
    </Form.Item>
  )
}

export default forwardRef<FieldApi, Props>(CheckboxGroupField)
