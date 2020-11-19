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
    <Form>
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