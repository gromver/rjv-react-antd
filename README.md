# rjv-react-antd

Ant Design's [form fields](https://ant.design/components/form) powered by the [rjv-react](https://github.com/gromver/rjv-react)

## Install
```
yarn add rjv rjv-react rjv-react-antd
```

## Components

- [Form](#form)
- [FormItemField](#formitemfield)

### Form
Combines `rjv-react`'s `FormProvider` and `antd`'s `Form` components together.

Properties extend Ant's form [props](https://ant.design/components/form/#Form):

Name | Type | Default | Description
--- | :---: | :---: | ---
`data`* | `any` | undefined | initial form data
`ref` | `RefObject<FormApi>` | undefined | ref to the [FormApi](https://github.com/gromver/rjv-react#formapi) instance
`validateTrigger` | `string` | 'onBlur' | when fields should be validated, possible values `onBlur`, `onChange`, `none`
`focusFirstError` | `boolean` | true | focus the first field with an error after a form submitting
`onSuccess` | `(data: any) => void` &#124; `Promise<void>` | undefined | successful form submission handler
`onError` | `(firstErrorField: FirstErrorField) => void` | undefined | unsuccessful form submission handler

### FormItemField
Helps to create complex form [controls](https://ant.design/components/form/#components-form-demo-complex-form-control).

Properties extend Antd's form item [props](https://ant.design/components/form/#Form.Item):

Name | Type | Default | Description
--- | :---: | :---: | ---
`showAllErrors` | `boolean` | true | show all errors or the only first

## Higher Order Fields (HOF)

- [InputField](#inputfield)
- [NumberField](#numberfield)
- [SelectField](#selectfield)
- [SwitchField](#switchfield)
- [CheckboxField](#checkboxfield)
- [CheckboxGroupField](#checkboxgroupfield)
- [RadioGroupField](#radiogroupfield)
- [RateField](#ratefield)
- [DatePickerField](#datepickerfield)
- [RangePickerField](#rangepickerfield)

### InputField
HOF over Antd's `Input` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`placeholder` | `string` | undefined | field placeholder
`inputProps` | `InputProps` | {} | Antd's [`InputProps`](https://ant.design/components/input/#Input)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onBlur' | possible values are `onBlur`, `onChange`, `none`

### NumberField
HOF over Antd's `InputNumber` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`placeholder` | `string` | undefined | field placeholder
`inputProps` | `NumberProps` | {} | Antd's [`NumberProps`](https://ant.design/components/input-number/#API)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onBlur' | possible values are `onBlur`, `onChange`, `none`

### SelectField
HOF over Antd's `Select` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`children`* | `React.ReactNodeArray` | undefined | select options
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `SelectProps` | {} | Antd's [`SelectProps`](https://ant.design/components/select/#Select-props)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onBlur' | possible values are `onBlur`, `onChange`, `none`

### SwitchField
HOF over Antd's `Switch` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `SwitchProps` | {} | Antd's [`SwitchProps`](https://ant.design/components/switch/#API)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onChange' | possible values are `onChange`, `none`. The `onBlur` value is treated an `onChange`

### CheckboxField
HOF over Antd's `Checkbox` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `CheckboxProps` | {} | Antd's [`CheckboxProps`](https://ant.design/components/checkbox/#Checkbox)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onChange' | possible values are `onChange`, `none`. The `onBlur` value is treated an `onChange` 

### CheckboxGroupField
HOF over Antd's `Checkbox.Group` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`children`* | `React.ReactNodeArray` | undefined | checkbox group items
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `CheckboxGroupProps` | {} | Antd's [`CheckboxGroupProps`](https://ant.design/components/checkbox/#Checkbox-Group)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onChange' | possible values are `onChange`, `none`. The `onBlur` value is treated an `onChange`

### RadioGroupField
HOF over Antd's `Radio.Group` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`children`* | `React.ReactNodeArray` | undefined | radio group items
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `RadioGroupProps` | {} | Antd's [`RadioGroupProps`](https://ant.design/components/radio/#RadioGroup)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onChange' | possible values are `onChange`, `none`. The `onBlur` value is treated an `onChange`

### RateField
HOF over Antd's `Rate` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `RateProps` | {} | Antd's [`RateProps`](https://ant.design/components/rate/#API)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onChange' | possible values are `onChange`, `none`. The `onBlur` value is treated an `onChange`

### DatePickerField
HOF over Antd's `DatePicker` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `DatePickerProps` | {} | Antd's [`DatePickerProps`](https://ant.design/components/date-picker/#DatePicker)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onBlur' | possible values are `onBlur`, `onChange`, `none`

### RangePickerField
HOF over Antd's `RangePicker` component

Properties:

Name | Type | Default | Description
--- | :---: | :---: | ---
`path`* | `string` | undefined | path to the data property
`schema`* | `Object<Schema>` | undefined | validation JSON schema
`ref` | `RefObject<FormApi>` | undefined | ref to the [FieldApi](https://github.com/gromver/rjv-react#fieldapi) instance
`dependencies` | `any[]` | [] | external values that affect the validation schema
`label` | `React.ReactNode` | undefined | field label
`help` | `React.ReactNode` | undefined | field help
`inputProps` | `RangePickerProps` | {} | Antd's [`RangePickerProps`](https://ant.design/components/date-picker/#RangePicker)
`itemProps` | `FormItemProps` | {} | Antd's [`FormItemProps`](https://ant.design/components/form/#Form.Item)
`clearStateOnChange` | `boolean` | true | mark field as not validated when the field value changes
`autoFocus` | `boolean` | false | focus field on mount
`validateTrigger` | `string` | inherited from the [`Form`](#form) component or 'onBlur' | possible values are `onBlur`, `onChange`, `none`

## License
**rjv-react-antd** is released under the MIT license.
See the [LICENSE file] for license text and copyright information.

[LICENSE file]: https://github.com/gromver/rjv-react-antd/blob/master/LICENSE
