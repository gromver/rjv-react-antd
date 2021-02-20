import React, { useRef } from 'react'
import { types } from 'rjv'
import { FieldApi } from 'rjv-react'
import { Button, Alert } from 'antd'
import Form from '../src/components/Form'
import InputField from '../src/components/InputField'

export default {
  title: 'Components / InputField',
  component: InputField
}

export const Overview = () => {
  const schema: types.ISchema = {
    default: '',
    presence: true,
    format: 'email'
  }

  return (
    <Form data={{}} layout="vertical">
      <Alert message="All fields should be valid emails" type="warning" showIcon />

      <br />

      <InputField
        schema={schema}
        path="field1"
        label={'Case #1 - validationTrigger=onBlur, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        autoFocus
      />

      <InputField
        schema={schema}
        path="field2"
        label={'Case #2 - validationTrigger=onBlur, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        clearStateOnChange={false}
      />

      <InputField
        schema={schema}
        path="field3"
        label={'Case #3 - validationTrigger=onChange, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      />

      <InputField
        schema={schema}
        path="field4"
        label={'Case #4 - validationTrigger=onChange, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        clearStateOnChange={false}
      />

      <InputField
        schema={schema}
        path="field5"
        label={'Case #5 - validationTrigger=none, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      />

      <InputField
        schema={schema}
        path="field6"
        label={'Case #6 - validationTrigger=none, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
      />

      <InputField
        schema={{ type: 'string', default: 'readonly content', readonly: true }}
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
      <InputField
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
