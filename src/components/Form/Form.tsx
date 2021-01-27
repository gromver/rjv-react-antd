import React, { useMemo, useCallback, FC } from 'react'
import { Form as AntForm } from 'antd'
import { FormProps as AntFormProps } from 'antd/es/form'
import { FormProvider, useFormApi, FirstErrorField } from 'rjv-react'
import { FormContext, FormContextValue } from './FormContext'

type Props = AntFormProps & {
  validateTrigger?: 'onBlur' | 'onChange' | 'none';
  focusFirstError?: boolean;
  onSuccess?: (data: any) => void | Promise<void>;
  onError?: (firstErrorField: FirstErrorField) => void;
}

function Form ({
  validateTrigger,
  onSuccess,
  onError,
  focusFirstError = true,
  ...formProps
}: Props) {
  const formContextValue = useMemo<FormContextValue>(() => {
    return {
      validateTrigger: validateTrigger || 'onBlur'
    }
  }, [validateTrigger])

  const { submit } = useFormApi()

  const handleSubmit = useCallback(() => {
    submit(
      onSuccess,
      (firstErrorField) => {
        onError && onError(firstErrorField)

        if (focusFirstError) {
          firstErrorField && firstErrorField.focus()
        }
      }
    )
  }, [submit, onSuccess, onError])

  return (
    <FormContext.Provider value={formContextValue}>
      <AntForm onSubmitCapture={handleSubmit} {...formProps} />
    </FormContext.Provider>
  )
}

const WithFormProvider: FC<Props & { data: any }> = ({ data, ...rest }) => {
  return (
    <FormProvider data={data}>
      <Form {...rest} />
    </FormProvider>
  )
}

export default WithFormProvider
