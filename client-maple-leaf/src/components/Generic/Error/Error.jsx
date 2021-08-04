import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './Error.styled';

const Error = ({ message }) => <Styled.Container>{message}</Styled.Container>;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
