import React from 'react'
import { types } from 'rjv'
import { Button, Alert } from 'antd'
import moment from 'moment'
import Form from '../src/components/Form'
import RangePickerField from '../src/components/RangePickerField'

export default {
  title: 'Components / RangePickerField',
  component: RangePickerField
}

export const Overview = () => {
  const schema: types.ISchema = { presence: true }

  return (
    <Form data={{}} layout="vertical">
      <Alert message="All fields are required" type="warning" showIcon />

      <br />

      <RangePickerField
        schema={schema}
        path="field1"
        label={'Case #1 - validationTrigger=onBlur, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        autoFocus
      />

      <RangePickerField
        schema={schema}
        path="field2"
        label={'Case #2 - validationTrigger=onBlur, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        clearStateOnChange={false}
      />

      <RangePickerField
        schema={schema}
        path="field3"
        label={'Case #3 - validationTrigger=onChange, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
      />

      <RangePickerField
        schema={schema}
        path="field4"
        label={'Case #4 - validationTrigger=onChange, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        clearStateOnChange={false}
      />

      <RangePickerField
        schema={schema}
        path="field5"
        label={'Case #5 - validationTrigger=none, clearStateOnChange=true'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      />

      <RangePickerField
        schema={schema}
        path="field6"
        label={'Case #6 - validationTrigger=none, clearStateOnChange=false'}
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
      />

      <RangePickerField
        schema={{ default: [moment('2019-09-03'), moment('2019-09-05')], presence: true, readonly: true }}
        path="field7"
        label={'Case #7 - readonly=true'}
        itemProps={{ hasFeedback: true }}
      />

      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}
