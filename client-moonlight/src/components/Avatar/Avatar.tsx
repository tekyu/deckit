import React from 'react';

import IAvatar from 'components/Avatar/IAvatar';
import { BiUserCircle } from 'react-icons/bi';
import * as Styled from './Avatar.styled';

const Avatar = ({
  url = '',
  className = '',
}: IAvatar): JSX.Element => (
  <Styled.Avatar className={className}>
    {url ? (
      <Styled.Image src={url} alt="User's avatar" />
    ) : <BiUserCircle />}

  </Styled.Avatar>
);

export default Avatar;
