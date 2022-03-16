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
  ...rest
}: ITextInput): JSX.Element => (
  <Styled.TextInput showBorder={showBorder}>
    {label && <Label>{label}</Label>}
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Styled.Input {...rest} value={value} type="text" placeholder={placeholder} name={name} id={id} $alignCenter={alignCenter} />
  </Styled.TextInput>
);

export default TextInput;
