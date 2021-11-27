import { rgba } from 'polished';
import styled from 'styled-components';

export const Panel = styled.div<{ palette?: string; variant?: string }>`
  background: ${({ theme, palette, variant }) => theme.palette[palette || 'backgrounds'][variant || palette ? 'main' : 'secondary']};
  color: ${({ theme, palette }) => theme.palette[palette || 'colors'][palette ? 'contrastText' : 'primary']};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => rgba(theme.palette.primary.light, 0.1)};
  box-shadow: 0px 0px 5px -2px rgba(8, 73, 146, 0.1);
  margin: 10px;
  display: inline-flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 12px;
  font-family: ${({ theme }) => theme.typography.secondary};
`;

export const Header = styled.div<{ showBorder: boolean; palette?: string }>`
  padding: 12px;
  font-size: 20px;
  display: flex;
  align-items: center;
  color: ${({ theme, palette }) => theme.palette[palette || 'primary'][palette ? 'contrastText' : 'main']};
`;

export const Title = styled.div<{ palette?: string }>`
  font-family: ${({ theme }) => theme.typography.primary};
  font-weight: 600;
  color: ${({ theme, palette }) => theme.palette[palette || 'primary'][palette ? 'contrastText' : 'main']};
`;

export const IconContainer = styled.div`
  margin-right: 12px;
`;

export const ToolbarContainer = styled.div`
  margin-left: auto;
  > * {
    margin: 0 2px;
  }
`;
