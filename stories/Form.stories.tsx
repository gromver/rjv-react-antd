import React, { createRef } from 'react'
import { Button } from 'antd'
import { ValidationMessage } from 'rjv'
import { ModelProviderRef, OptionsProvider } from 'rjv-react'
import Form from '../src/components/Form'
import InputField from '../src/components/InputField'

export default {
  title: 'Components / Form',
  component: Form
}

export const Case1 = () => {
  return (
    <Form
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

export const Case2 = () => {
  const modelRef = createRef<ModelProviderRef>()

  return (
    <Form
      ref={modelRef}
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
      <Button htmlType="submit" onClick={() => console.log(modelRef)}>Submit</Button>
    </Form>
  )
}
Case2.storyName = 'Ref forwarding test'

export const Case3 = () => {
  return (
    <OptionsProvider
      options={{
        descriptionResolver: (m) => {
          if (typeof m.description === 'string') {
            return m.description.toUpperCase()
          }

          return m.description
        }
      }}
    >
      <Form layout={'vertical'}>
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
                        r(
                          ref.createErrorResult(
                            new ValidationMessage(
                              'verifyEmail',
                              'Email is already used'
                            )
                          )
                        )
                      }

                      return r(ref.createSuccessResult())
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
