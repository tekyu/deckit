import React from "react";
import PropTypes from "prop-types";
import * as Styled from './AddSeat.styled';

const AddSeat = ({ handler }) => (
  <Styled.Container>
    <Styled.IconContainer>
      <Styled.ActionIcon icon="plus" size={60} onClick={handler} />
    </Styled.IconContainer>
  </Styled.Container>
);

AddSeat.defaultProps = {
  handler: () => { },
};

AddSeat.propTypes = {
  handler: PropTypes.func,
};

export default AddSeat;
