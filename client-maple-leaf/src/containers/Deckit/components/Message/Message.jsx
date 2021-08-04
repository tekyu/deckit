import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { deckitSelectors, userSelectors } from 'store/selectors';
import HinterStage from './components/HinterStage/HinterStage';
import HintMessage from './components/HintMessage';

const StyledContainer = styled.div`
  margin: 10px 20px;
  width: auto;
  padding: 10px 20px;
  border-radius: 6px;
  text-align: center;
  background: #fff;
  box-shadow: -5px 5px 15px rgba(207, 119, 243, 0.2),
    0px 5px 15px rgba(0, 155, 255, 0.2), -5px 5px 15px rgba(42, 201, 219, 0.2);
`;

const GetMessage = ({
  stage, hinter, userId, hint,
}) => {
  const { id } = hinter;
  switch (stage) {
    case 2:
      return <HinterStage hinter={hinter} userId={userId} />;
    case 3:
    case 4:
    case 5:
      return (
        <HintMessage
          hint={hint}
          stage={stage}
          isHinter={id === userId}
        />
      );
    case 8:
      return <p>WINNER</p>;
    default:
      return <p>{`You shouldn't be able to see this. Stage: ${stage}`}</p>;
  }
};

GetMessage.propTypes = {
  stage: PropTypes.number.isRequired,
  hinter: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
};

const Message = () => {
  const stage = useSelector(deckitSelectors.gameStage);
  const hinter = useSelector(deckitSelectors.hinter);
  const hint = useSelector(deckitSelectors.hint);
  const userId = useSelector(userSelectors.userId);

  return (
    <StyledContainer>
      <GetMessage stage={stage} hint={hint} hinter={hinter} userId={userId} />
    </StyledContainer>
  );
};

export default Message;
