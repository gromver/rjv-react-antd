import React, { useMemo, forwardRef, createRef, useCallback } from 'react'
import { Form as AntForm } from 'antd'
import { FormProps } from 'antd/es/form'
import { FormProvider, FormProviderRef, FieldApi } from 'rjv-react'
import { FormContext, FormContextValue } from './FormContext'

type Props = FormProps & {
  data?: any;
  validateTrigger?: 'onBlur' | 'onChange' | 'none';
  focusFirstError?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (errorField: FieldApi) => void;
}

const Form = forwardRef<FormProviderRef, Props>(({
  // validationOptions,
  validateTrigger,
  onSuccess,
  onError,
  data = {},
  focusFirstError = true,
  ...formProps
}, ref: any) => {
  const value = useMemo<FormContextValue>(() => {
    return {
      validateTrigger: validateTrigger || 'onBlur'
    }
  }, [validateTrigger])
  const fallbackRef = createRef<FormProviderRef | undefined>()

  const handleSubmit = useCallback(() => {
    const providerRef: React.RefObject<FormProviderRef | undefined> = ref || fallbackRef

    if (providerRef.current) {
      return providerRef.current
        .submit()
        .then(({ valid, firstErrorField, data }) => {
          if (valid) {
            onSuccess && onSuccess(data)
          } else {
            onError && onError(firstErrorField as any)

            if (focusFirstError) {
              firstErrorField && firstErrorField.focus()
            }
          }
        })
    }
  }, [ref, fallbackRef])

  return (
    <FormProvider
      ref={ref || fallbackRef}
      data={data}>
      <FormContext.Provider value={value}>
        <AntForm onSubmitCapture={handleSubmit} {...formProps} />
      </FormContext.Provider>
    </FormProvider>
  )
})

export default Form
