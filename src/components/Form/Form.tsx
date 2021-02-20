import React, { useMemo, useCallback, FC, forwardRef, RefObject } from 'react'
import { Form as AntForm } from 'antd'
import { FormProps as AntFormProps } from 'antd/es/form'
import { FormProvider, useFormApi, FormApi, FirstErrorField } from 'rjv-react'
import { FormContext, FormContextValue } from './FormContext'

type FormProps = AntFormProps & {
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
}: FormProps) {
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

type WithFormProviderProps = FormProps & { data: any }

const WithFormProvider: FC<WithFormProviderProps> = ({ data, ...rest }, ref) => {
  return (
    <FormProvider ref={ref} data={data}>
      <Form {...rest} />
    </FormProvider>
  )
}

export default forwardRef<FormApi, WithFormProviderProps>(WithFormProvider)
