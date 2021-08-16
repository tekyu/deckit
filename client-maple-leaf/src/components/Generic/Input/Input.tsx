import React from 'react';

type InputProps = {
  name: string;
  text: string;
  value: string | number;
  handler: () => void;
}

const Input = ({
  name, text, value, handler,
}: InputProps): JSX.Element => (
  <input
    type="text"
    name={name}
    onChange={handler}
    placeholder={text}
    value={value}
  />
);

export default Input;
