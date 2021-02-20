import React, { useRef } from 'react'
import { types } from 'rjv'
import { Button, Alert } from 'antd'
import moment from 'moment'
import { FieldApi } from 'rjv-react'
import Form from '../src/components/Form'
import DatePickerField from '../src/components/DatePickerField'

export default {
  title: 'Components / DatePickerField',
  component: DatePickerField
}

export const Overview = () => {
  const schema: types.ISchema = { presence: true }

  return (
    <Form data={{}} layout="vertical">
      <Alert message="All fields are required" type="warning" showIcon />

      <br />

      <DatePickerField
        schema={schema}
        path="field1"
        label={'Case #1 - validationTrigger=onBlur, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        autoFocus
      />

      <DatePickerField
        schema={schema}
        path="field2"
        label={'Case #2 - validationTrigger=onBlur, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        clearStateOnChange={false}
      />

      <DatePickerField
        schema={schema}
        path="field3"
        label={'Case #3 - validationTrigger=onChange, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      />

      <DatePickerField
        schema={schema}
        path="field4"
        label={'Case #4 - validationTrigger=onChange, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        clearStateOnChange={false}
      />

      <DatePickerField
        schema={schema}
        path="field5"
        label={'Case #5 - validationTrigger=none, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      />

      <DatePickerField
        schema={schema}
        path="field6"
        label={'Case #6 - validationTrigger=none, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
      />

      <DatePickerField
        schema={{ default: moment('2019-09-03'), presence: true, readonly: true }}
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
      <DatePickerField
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
