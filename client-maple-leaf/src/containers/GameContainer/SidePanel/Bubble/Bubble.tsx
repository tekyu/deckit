import React from 'react';
import PropTypes from 'prop-types';
import ScoreIcon from 'components/Generic/Icons/ScoreIcon';
import ChatIcon from 'components/Generic/Icons/ChatIcon';
import * as Styled from './Bubble.styled';

interface IBubble {
  handler: () => void;
  opened: boolean;
  updated: boolean;
  name: string
}
const Bubble = ({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handler = () => { },
  opened,
  updated,
  name = 'chat',
}: IBubble): JSX.Element => {
  const getBubbleIcon = (name: string): JSX.Element | null => {
    switch (name) {
      case 'score':
        return <ScoreIcon name={name} handler={handler} />;
      case 'chat':
        return <ChatIcon name={name} handler={handler} />;
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
