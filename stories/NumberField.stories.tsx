import React, { useRef } from 'react'
import { types } from 'rjv'
import { FieldApi } from 'rjv-react'
import NumberField from '../src/components/NumberField'
import Form from '../src/components/Form/Form'
import { Alert, Button } from 'antd'

export default {
  title: 'Components / NumberField',
  component: NumberField
}

export const Overview = () => {
  const schema: types.ISchema = {
    type: 'number',
    presence: true,
    minimum: 5
  }

  return (
    <Form data={{}} layout="vertical">
      <Alert message="All fields should be greater or equal 5" type="warning" showIcon />

      <br />

      <NumberField
        schema={schema}
        path="field1"
        label={'Case #1 - validationTrigger=onBlur, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        autoFocus
      />

      <NumberField
        schema={schema}
        path="field2"
        label={'Case #2 - validationTrigger=onBlur, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        clearStateOnChange={false}
      />

      <NumberField
        schema={schema}
        path="field3"
        label={'Case #3 - validationTrigger=onChange, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      />

      <NumberField
        schema={schema}
        path="field4"
        label={'Case #4 - validationTrigger=onChange, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        clearStateOnChange={false}
      />

      <NumberField
        schema={schema}
        path="field5"
        label={'Case #5 - validationTrigger=none, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      />

      <NumberField
        schema={schema}
        path="field6"
        label={'Case #6 - validationTrigger=none, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
      />

      <NumberField
        schema={{ type: 'number', default: 10, readonly: true }}
        path="field7"
        label={'Case #7 - readonly=true'}
        itemProps={{ hasFeedback: true }}
      />

      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}

export const RefForwarding = () => {
  const fieldRef = useRef<FieldApi>(null)

  return (
    <Form data={{}} layout="vertical">
      <NumberField
        ref={fieldRef}
        schema={{ presence: true }}
        path="field"
        label="Required field"
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        autoFocus
      />

      <Button onClick={() => fieldRef.current?.validate()}>Trigger validate</Button>
    </Form>
  )
}
