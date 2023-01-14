import React from 'react';

export default interface ITextInput {
  id?: string
  placeholder?: string;
  label?: string;
  showBorder?: boolean;
  name: string;
  alignCenter?: boolean;
  value?: string | number;
  formik?: boolean;
  onChange?: (value: string | number) => void
  type?: 'text' | 'number';
}
