import React from 'react';

const InputGroup = ({
  name,
  labelText,
  type,
  placeholder,
  id,
  classes = [],
  handler,
  ...props
}) => {
  const inputClass = ['inputGroupInput', ...classes].join(', ');

  return (
    <div className="inputGroup">
      <label htmlFor={name}>{labelText}</label>
      <input
        name={name}
        type={type}
        // {...(id ? (id = { id }) : '')}
        className={inputClass}
        placeholder={placeholder || ''}
        onChange={handler}
      />
    </div>
  );
};

export default InputGroup;
