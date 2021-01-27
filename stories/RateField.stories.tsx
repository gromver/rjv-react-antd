import React from 'react'
import { Button } from 'antd'
import Form from '../src/components/Form'
import RateField from '../src/components/RateField'

export default {
  title: 'Components / RateField',
  component: RateField
}

export const Overview = () => {
  return (
    <Form data={{}}>
      <RateField
        schema={{
          type: 'number',
          minimum: 3,
          presence: true
        }}
        path="field"
        label={'Rate field'}
        help={'Should have at least 3 stars'}
        itemProps={{ hasFeedback: true }}
      />
      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}

export const Readonly = () => {
  return (
    <Form data={{}}>
      <RateField
        schema={{
          type: 'number',
          readonly: true
        }}
        path="field"
        label={'Rate field readonly'}
        itemProps={{ hasFeedback: true }}
      />
      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}
