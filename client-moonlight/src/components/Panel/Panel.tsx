import React from 'react';

import IPanel from 'components/Panel/IPanel';
import * as Styled from './Panel.styled';

const Panel = ({
  children,
  icon,
  title,
  toolbar,
  palette,
  variant,
}: IPanel): JSX.Element => (
  <Styled.Panel palette={palette} variant={variant}>
    {(title || icon || toolbar) && (
      <Styled.Header showBorder={!!title} palette={palette}>
        {icon && (
          <Styled.IconContainer>
            {icon}
          </Styled.IconContainer>
        )}
        {title && <Styled.Title palette={palette}>{title}</Styled.Title>}
        {toolbar && <Styled.ToolbarContainer>{toolbar}</Styled.ToolbarContainer>}
      </Styled.Header>
    )}

    <Styled.Content>
      {children}
    </Styled.Content>
  </Styled.Panel>
);

export default Panel;
