import React from 'react';

import IComingSoon from 'components/ComingSoon/IComingSoon';
import * as Styled from './ComingSoon.styled';

const ComingSoon = ({
  children = 'Default',
}: IComingSoon): JSX.Element => <Styled.ComingSoon>{children}</Styled.ComingSoon>;

export default ComingSoon;
