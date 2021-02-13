import { types } from 'rjv'

export type RjvFieldProps = {
  path: string;
  schema: types.ISchema;
  dependencies?: any[];
}
