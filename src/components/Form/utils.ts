import { FieldState } from 'rjv-react'

/**
 * Extracts validation status for the Antd's Form.Item component
 * @param state
 */
export function getValidationStatus (state: FieldState) {
  if (state.isValidating) {
    return 'validating'
  }

  if (state.isValidated) {
    if (state.isValid) {
      return state.message ? 'warning' : 'success'
    }

    if (!state.isValid) {
      return 'error'
    }
  }

  return undefined
}
