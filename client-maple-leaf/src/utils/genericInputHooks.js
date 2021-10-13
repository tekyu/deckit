import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GenericInputHooks = ({
  handler,
  initialValue,
  resetValueAfterSending,
  name,
  type,
  ...rest
}) => {
  const [input, setInput] = useState(initialValue);
  const inputOnChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const inputOnKeypressHandler = (e) => {
    if (e.keyCode === 13 && input.length > 0) {
      handler(input);
      if (resetValueAfterSending) {
        setInput(initialValue);
      }
    }
  };
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <input
      name={name}
      type={type}
      value={input}
      onChange={inputOnChangeHandler}
      onKeyUp={inputOnKeypressHandler}
      {...rest}
    />
  );
};

GenericInputHooks.propTypes = {
  handler: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  resetValueAfterSending: PropTypes.bool,
  initialValue: PropTypes.string,
};

GenericInputHooks.defaultProps = {
  type: 'text',
  name: 'input',
  initialValue: '',
  resetValueAfterSending: true,
};
export default GenericInputHooks;
