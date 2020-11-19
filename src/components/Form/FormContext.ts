import { createContext } from 'react'

export type FormContextValue = {
  validateTrigger: 'onBlur' | 'onChange' | 'none';
}

export const FormContext = createContext<FormContextValue | undefined>(
  undefined
)

export default FormContext
