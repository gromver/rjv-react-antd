import React, { FC, useMemo } from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/es/form'
import { CatchErrors, useErrors } from 'rjv-react'

type Props = {
  showAllErrors?: boolean
} & FormItemProps

function FormItemField ({
  children,
  label,
  help,
  showAllErrors = true,
  ...props
}: Props) {
  const errors = useErrors()
  const _help = useMemo(() => {
    if (errors.length) {
      return showAllErrors ? errors.map(({ message }) => message) : errors[0].message
    }

    return help
  }, [help, errors, showAllErrors])

  return (
    <Form.Item
      label={label}
      validateStatus={errors.length ? 'error' : undefined}
      help={_help}
      {...props}
    >
      {children}
    </Form.Item>
  )
}

const WithErrorProvider: FC<Props> = (props) => {
  return (
    <CatchErrors>
      <FormItemField {...props} />
    </CatchErrors>
  )
}

export default WithErrorProvider
