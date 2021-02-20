import React, { useRef } from 'react'
import { types } from 'rjv'
import { FieldApi } from 'rjv-react'
import { Alert, Button, Select } from 'antd'
import Form from '../src/components/Form'
import SelectField from '../src/components/SelectField'

export default {
  title: 'Components / SelectField',
  component: SelectField
}

export const SingleMode = () => {
  const schema: types.ISchema = {
    presence: true,
    const: 'foo'
  }

  return (
    <Form data={{}} layout="vertical">
      <Alert message={'Only "Foo" is valid'} type="warning" showIcon />

      <br />

      <SelectField
        schema={schema}
        path="field1"
        label="Case #1 - validationTrigger=onChange, clearStateOnChange=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field2"
        label="Case #2 - validationTrigger=onChange, clearStateOnChange=false"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        validateTrigger="onChange"
        clearStateOnChange={false}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field3"
        label="Case #3 - validationTrigger=onBlur, clearStateOnChange=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        validateTrigger="onBlur"
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field4"
        label="Case #4 - validationTrigger=onBlur, clearStateOnChange=false"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        validateTrigger="onBlur"
        clearStateOnChange={false}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field5"
        label="Case #5 - validationTrigger=none, clearStateOnChange=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field6"
        label="Case #6 - validationTrigger=none, clearStateOnChange=false"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field6"
        label="Case #6 - validationTrigger=none, clearStateOnChange=false"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        clearStateOnChange={false}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={{ type: 'string', readonly: true }}
        path="field7"
        label="Case #7 - readonly=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}

export const MultipleItems = () => {
  const schema = {
    default: [],
    items: {
      enum: ['foo']
    }
  }

  return (
    <Form data={{}} layout="vertical">
      <Alert message={'Only "Foo" is valid'} type="warning" showIcon />

      <br />

      <SelectField
        schema={schema}
        path="field1"
        label="Case #1 - validationTrigger=onChange, clearStateOnChange=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        inputProps={{ mode: 'multiple' }}
        validateTrigger="onChange"
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field2"
        label="Case #2 - validationTrigger=onChange, clearStateOnChange=false"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        inputProps={{ mode: 'multiple' }}
        validateTrigger="onChange"
        clearStateOnChange={false}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field3"
        label="Case #3 - validationTrigger=onBlur, clearStateOnChange=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        inputProps={{ mode: 'multiple' }}
        validateTrigger="onBlur"
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field4"
        label="Case #4 - validationTrigger=onBlur, clearStateOnChange=false"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        inputProps={{ mode: 'multiple' }}
        validateTrigger="onBlur"
        clearStateOnChange={false}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={schema}
        path="field5"
        label="Case #5 - validationTrigger=none, clearStateOnChange=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        inputProps={{ mode: 'multiple' }}
        validateTrigger="none"
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <SelectField
        schema={{ type: 'array', default: [], readonly: true }}
        path="field7"
        label="Case #7 - readonly=true"
        placeholder="Select..."
        itemProps={{ hasFeedback: true }}
        inputProps={{ mode: 'multiple' }}
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}

export const RefForwarding = () => {
  const fieldRef = useRef<FieldApi>(null)

  return (
    <Form data={{}} layout="vertical">
      <SelectField
        ref={fieldRef}
        schema={{ presence: true }}
        path="field"
        label="Required field"
        itemProps={{ hasFeedback: true }}
        validateTrigger="none"
        autoFocus
      >
        <Select.Option value={'foo'}>Foo</Select.Option>
        <Select.Option value={'bar'}>Bar</Select.Option>
      </SelectField>

      <Button onClick={() => fieldRef.current?.validate()}>Trigger validate</Button>
    </Form>
  )
}
