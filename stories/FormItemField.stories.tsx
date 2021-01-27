import React from 'react'
import { Button, Select, Input } from 'antd'
import Form from '../src/components/Form'
import FormItemField from '../src/components/FormItemField'
import InputField from '../src/components/InputField'
import SelectField from '../src/components/SelectField'

export default {
  title: 'Components / FormItemField',
  component: FormItemField
}

export const AllErrorsTrue = () => {
  return (
    <Form
      data={{}}
      layout={'vertical'}
      onSuccess={(data) => console.log('success', data)}
      onError={(errorField: any) => console.log('error', errorField)}
    >
      <FormItemField
        label="Address"
      >
        <Input.Group compact>
          <SelectField
            path="city"
            schema={{
              presence: true
            }}
            itemProps={{ noStyle: true }}
            placeholder="Select city"
            autoFocus
          >
            <Select.Option value="Paris">Paris</Select.Option>
            <Select.Option value="London">London</Select.Option>
          </SelectField>

          <InputField
            schema={{
              default: '',
              presence: true
            }}
            path="street"
            label={'Street'}
            itemProps={{ noStyle: true }}
            inputProps={{ style: { width: '50%' } }}
            placeholder="Input street"
          />
        </Input.Group>
      </FormItemField>
      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}

export const AllErrorsFalse = () => {
  return (
    <Form
      data={{}}
      layout={'vertical'}
      onSuccess={(data) => console.log('success', data)}
      onError={(errorField: any) => console.log('error', errorField)}
    >
      <FormItemField
        label="Address"
        showAllErrors={false}
      >
        <Input.Group compact>
          <SelectField
            path="city"
            schema={{
              presence: true
            }}
            itemProps={{ noStyle: true }}
            placeholder="Select city"
            autoFocus
          >
            <Select.Option value="Paris">Paris</Select.Option>
            <Select.Option value="London">London</Select.Option>
          </SelectField>

          <InputField
            schema={{
              default: '',
              presence: true
            }}
            path="street"
            label={'Street'}
            itemProps={{ noStyle: true }}
            inputProps={{ style: { width: '50%' } }}
            placeholder="Input street"
          />
        </Input.Group>
      </FormItemField>
      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}
