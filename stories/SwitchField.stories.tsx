import React from 'react'
import { Alert, Button } from 'antd'
import Form from '../src/components/Form'
import SwitchField from '../src/components/SwitchField'

export default {
  title: 'Components / SwitchField',
  component: SwitchField
}

export const Overview = () => {
  const schema = {
    default: false,
    const: true
  }

  return (
    <Form layout="vertical">
      <Alert message="Should be true" type="warning" showIcon />

      <br />

      <SwitchField
        schema={schema}
        path="field1"
        label="Case #1 - validationTrigger=onBlur, clearStateOnChange=true"
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      />

      <SwitchField
        schema={schema}
        path="field2"
        label="Case #2 - validationTrigger=onBlur, clearStateOnChange=false"
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        clearStateOnChange={false}
      />

      <SwitchField
        schema={schema}
        path="field3"
        label="Case #3 - validationTrigger=none, clearStateOnChange=true"
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      />

      <SwitchField
        schema={schema}
        path="field4"
        label="Case #5 - validationTrigger=none, clearStateOnChange=false"
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
      />

      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}
