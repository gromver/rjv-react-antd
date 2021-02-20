import React, { useRef } from 'react'
import { FieldApi } from 'rjv-react'
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

export const RefForwarding = () => {
  const fieldRef = useRef<FieldApi>(null)

  return (
    <Form data={{}} layout="vertical">
      <RateField
        ref={fieldRef}
        schema={{ presence: true }}
        path="field"
        label="Required field"
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
      />

      <Button onClick={() => fieldRef.current?.validate()}>Trigger validate</Button>
    </Form>
  )
}
