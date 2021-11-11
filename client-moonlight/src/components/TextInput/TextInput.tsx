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
}: ITextInput): JSX.Element => (
  <Styled.TextInput showBorder={showBorder}>
    {label && <Label>{label}</Label>}
    <Styled.Input value={value} type="text" placeholder={placeholder} name={name} id={id} $alignCenter={alignCenter} />
  </Styled.TextInput>
);

export default TextInput;
