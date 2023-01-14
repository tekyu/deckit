import React from 'react';

import ITextInput from 'components/TextInput/ITextInput';
import Label from 'components/Label/Label';
import * as Styled from './TextInput.styled';

const TextInput = ({
  name,
  placeholder = '',
  label = '',
  id = '',
  showBorder = false,
  alignCenter = false,
  value = '',
  formik = true,
  type = 'text',
  onChange = () => { },
  ...rest
}: ITextInput): JSX.Element => (
  <Styled.TextInput showBorder={showBorder}>
    {label && <Label>{label}</Label>}
    {
      formik
        // eslint-disable-next-line react/jsx-props-no-spreading
        ? (
          <Styled.Input
            {...rest}
            value={value}
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            $alignCenter={alignCenter}
          />
        )
        // eslint-disable-next-line react/jsx-props-no-spreading
        : (
          <Styled.SimpleInput
            {...rest}
            value={value}
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            $alignCenter={alignCenter}
            onChange={(e) => onChange(e.target.value)}
          />
        )
    }
  </Styled.TextInput>
);

export default TextInput;
