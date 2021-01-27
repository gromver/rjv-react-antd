import React, { createRef, useCallback } from 'react'
import { Button } from 'antd'
import { OptionsProvider } from 'rjv-react'
import Form from '../src/components/Form'
import InputField from '../src/components/InputField'

export default {
  title: 'Components / Form',
  component: Form
}

export const Case1 = () => {
  return (
    <Form
      data={{}}
      layout={'vertical'}
      onSuccess={(data) => console.log('success', data)}
      onError={(ref: any) => console.log('error', ref)}
    >
      <InputField
        schema={{
          default: '',
          presence: true,
          format: 'email'
        }}
        path="email"
        label={'Email'}
        itemProps={{ hasFeedback: true }}
        autoFocus
      />
      <Button htmlType="submit">Submit</Button>
    </Form>
  )
}
Case1.storyName = 'Overview'

export const Case3 = () => {
  const descriptionResolver = useCallback((m) => {
    return m.toString().toUpperCase()
  }, [])

  return (
    <OptionsProvider descriptionResolver={descriptionResolver}>
      <Form data={{}} layout={'vertical'}>
        <InputField
          schema={{
            default: '',
            presence: true,
            format: 'email',
            if: {
              presence: true,
              format: 'email'
            },
            then: {
              validate: (ref) =>
                new Promise((r) =>
                  setTimeout(
                    () => {
                      if (ref.value === 'wrong@email.com') {
                        r('Email is already used')
                      }

                      return r()
                    },
                    500,
                    {}
                  )
                )
            }
          }}
          path="email"
          label={'Email'}
          help={'Should be valid email not equal wrong@email.com'}
          itemProps={{ hasFeedback: true }}
          autoFocus
        />
      </Form>
    </OptionsProvider>
  )
}
Case3.storyName = 'With default options and async validation'
