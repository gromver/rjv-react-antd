import React, { FC } from 'react'
import { Form } from 'antd'
import { FormItemProps } from 'antd/es/form'
import { ErrorProvider, useErrors } from 'rjv-react'

type Props = {
  children: React.ReactNode;
  label?: React.ReactNode;
  help?: React.ReactNode;
  itemProps?: FormItemProps;
}

function FormItemField ({
  children,
  label,
  help,
  itemProps = {}
}: Props) {
  const errors = useErrors()

  return (
    <ErrorProvider>
      <Form.Item
        label={label}
        validateStatus={errors.length ? 'error' : undefined}
        help={errors.length ? errors.map(({ message }) => message) : help}
        {...itemProps}
      >
        {children}
      </Form.Item>
    </ErrorProvider>
  )
}

const WithErrorProvider: FC<Props> = (props) => {
  return (
    <ErrorProvider>
      <FormItemField {...props} />
    </ErrorProvider>
  )
}

export default WithErrorProvider
