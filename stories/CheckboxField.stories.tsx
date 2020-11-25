import React from 'react'
import { types } from 'rjv'
import { Alert, Button } from 'antd'
import Form from '../src/components/Form'
import CheckboxField from '../src/components/CheckboxField'

export default {
  title: 'Components / CheckboxField',
  component: CheckboxField
}

export const Overview = () => {
  const schema: types.ISchema = {
    default: false,
    const: true
  }

  return (
    <Form layout="vertical">
      <Alert message="Should be true" type="warning" showIcon />

      <br />

      <CheckboxField
        schema={schema}
        path="field1"
        label="Case #1 - validationTrigger=onBlur, clearStateOnChange=true"
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      />

      <CheckboxField
        schema={schema}
        path="field2"
        label="Case #2 - validationTrigger=onBlur, clearStateOnChange=false"
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        clearStateOnChange={false}
      />

      <CheckboxField
        schema={schema}
        path="field3"
        label="Case #3 - validationTrigger=none, clearStateOnChange=true"
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      />

      <CheckboxField
        schema={schema}
        path="field4"
        label="Case #4 - validationTrigger=none, clearStateOnChange=false"
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
      />

      <CheckboxField
        schema={{ type: 'boolean', default: true, readonly: true }}
        path="field5"
        label="Case #5 - readonly=true"
        itemProps={{ hasFeedback: true }}
      />

      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}
