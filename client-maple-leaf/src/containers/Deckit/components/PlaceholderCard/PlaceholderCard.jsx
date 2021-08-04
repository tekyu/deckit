import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 135px;
  height: 200px;
  margin: 0 10px;
  border-radius: 6px;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.28);
  background-image: linear-gradient(
    40deg,
    #2ac9db -30%,
    #009bff 47%,
    #cf77f3 150%
  );
  color: #fff;
  font-size: 60px;
`;

const PlaceholderCard = ({ amount }) => <StyledContainer>{amount}</StyledContainer>;

PlaceholderCard.defaultProps = {
  amount: 1,
};

PlaceholderCard.propTypes = {
  amount: PropTypes.number,
};

export default PlaceholderCard;
