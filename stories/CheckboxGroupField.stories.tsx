import React, { useRef } from 'react'
import Form from '../src/components/Form'
import CheckboxGroupField from '../src/components/CheckboxGroupField'
import { FieldApi } from 'rjv-react'
import { Button, Checkbox } from 'antd'

export default {
  title: 'Components / CheckboxGroupField',
  component: CheckboxGroupField
}

export const Overview = () => {
  return (
    <Form data={{}}>
      <CheckboxGroupField
        schema={{
          default: [],
          items: {
            type: 'string',
            enum: ['a', 'b']
          }
        }}
        path="field"
        label={'Checkbox group'}
        help={'Only "a" and "b" are valid'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      >
        <Checkbox value={'a'}>A</Checkbox>
        <Checkbox value={'b'}>B</Checkbox>
        <Checkbox value={'c'}>C</Checkbox>
      </CheckboxGroupField>
    </Form>
  )
}

export const Readonly = () => {
  return (
    <Form data={{}}>
      <CheckboxGroupField
        schema={{
          default: [],
          readonly: true
        }}
        path="field"
        label={'Checkbox readonly group'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      >
        <Checkbox value={'a'}>A</Checkbox>
        <Checkbox value={'b'}>B</Checkbox>
        <Checkbox value={'c'}>C</Checkbox>
      </CheckboxGroupField>
    </Form>
  )
}

export const RefForwarding = () => {
  const fieldRef = useRef<FieldApi>(null)

  return (
    <Form data={{}} layout="vertical">
      <CheckboxGroupField
        ref={fieldRef}
        schema={{
          default: [],
          items: {
            type: 'string',
            enum: ['a', 'b']
          }
        }}
        path="field"
        label={'Checkbox group'}
        help={'Only "a" and "b" are valid'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      >
        <Checkbox value={'a'}>A</Checkbox>
        <Checkbox value={'b'}>B</Checkbox>
        <Checkbox value={'c'}>C</Checkbox>
      </CheckboxGroupField>

      <Button onClick={() => fieldRef.current?.validate()}>Trigger validate</Button>
    </Form>
  )
}
