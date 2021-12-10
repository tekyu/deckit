/* eslint-disable indent */
import styled from 'styled-components';

export const Button = styled.button<{
  palette?: string;
  variant: string;
  version?: string;
  disabled?: boolean;
}>`
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
  background: ${({
  theme, palette, variant, version,
}) => (version === 'contained' ? theme.palette[palette || 'primary'][variant || 'main'] : 'none')};
  color: ${({
  theme, palette, version, variant,
}) => theme.palette[palette || 'primary'][version === 'contained' ? 'contrastText' : variant]};
  border-radius: 3px;
  padding: 12px 18px;
  font-family: ${({ theme }) => theme.typography.primary};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  user-select: none;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  border: ${({
  theme, palette, variant, version,
}) => (version === 'outlined' && palette ? `1px solid ${theme.palette[palette][variant || 'main']}` : 'none')};
  transition: all 0.2s ease-in;
&:hover {
  background: ${({
  theme, palette, version,
}) => (version === 'contained' ? theme.palette[palette || 'primary'].dark : 'none')};
  color: ${({
  theme, palette, version, variant,
}) => theme.palette[palette || 'primary'][version === 'contained' ? 'contrastText' : variant]};

}
`;
