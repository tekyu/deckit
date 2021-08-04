import React from 'react';
import PropTypes from 'prop-types';
import ScoreIcon from 'components/Generic/Icons/ScoreIcon';
import ChatIcon from 'components/Generic/Icons/ChatIcon';
import * as Styled from './Bubble.styled';

const Bubble = ({
  handler, opened, updated, name,
}) => {
  const getBubbleIcon = (name) => {
    switch (name) {
      case 'score':
        return <ScoreIcon name={name} onClick={handler} />;
      case 'chat':
        return <ChatIcon name={name} onClick={handler} />;
      default:
        return null;
    }
  };
  return (
    <Styled.Container name={name} opened={opened} updated={updated} onClick={handler}>
      {getBubbleIcon(name)}
    </Styled.Container>
  );
};

Bubble.defaultProps = {
  name: 'chat',
  opened: false,
  updated: false,
};

Bubble.propTypes = {
  handler: PropTypes.func.isRequired,
  name: PropTypes.string,
  opened: PropTypes.bool,
  updated: PropTypes.bool,
};

export default Bubble;
