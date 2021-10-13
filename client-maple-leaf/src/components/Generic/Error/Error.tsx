import React from 'react';
import * as Styled from './Error.styled';

const Error = ({ message }: { message: string }): JSX.Element => (
  <Styled.Container>{message}</Styled.Container>
);

export default Error;
