import React from 'react'
import { Radio } from 'antd'
import Form from '../src/components/Form'
import RadioGroupField from '../src/components/RadioGroupField'

export default {
  title: 'Components / RadioGroupField',
  component: RadioGroupField
}

export const RadioItems = () => {
  const schema = {
    default: '',
    type: 'string',
    enum: ['a', 'b']
  }

  return (
    <Form>
      <RadioGroupField
        schema={schema}
        path="field"
        label={'Radio Item Group'}
        help={'Only "a" or "b" are valid'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      >
        <Radio value={'a'}>A</Radio>
        <Radio value={'b'}>B</Radio>
        <Radio value={'c'}>C</Radio>
      </RadioGroupField>
    </Form>
  )
}

export const RadioButtons = () => {
  const schema = {
    default: '',
    type: 'string',
    enum: ['a', 'b']
  }

  return (
    <Form>
      <RadioGroupField
        schema={schema}
        path="field"
        label={'Radio Button Group'}
        help={'Only "a" or "b" are valid'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      >
        <Radio.Button value={'a'}>A</Radio.Button>
        <Radio.Button value={'b'}>B</Radio.Button>
        <Radio.Button value={'c'}>C</Radio.Button>
      </RadioGroupField>
    </Form>
  )
}