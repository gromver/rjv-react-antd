import React from 'react'
import FormProvider from '../src/components/Form'
import CheckboxGroupField from '../src/components/CheckboxGroupField'

export default {
  title: 'Components / CheckboxGroupField',
  component: CheckboxGroupField
}

export const Overview = () => {
  return (
    <FormProvider>
      <CheckboxGroupField
        schema={{
          default: [],
          items: {
            type: 'string',
            enum: ['a', 'b']
          }
        }}
        path="field"
        label={'Checkbox Group'}
        help={'Only "a" and "b" are valid'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      >
        <CheckboxGroupField.Checkbox value={'a'}>A</CheckboxGroupField.Checkbox>
        <CheckboxGroupField.Checkbox value={'b'}>B</CheckboxGroupField.Checkbox>
        <CheckboxGroupField.Checkbox value={'c'}>C</CheckboxGroupField.Checkbox>
      </CheckboxGroupField>
    </FormProvider>
  )
}