import { createGlobalStyle } from 'styled-components';
import { ITheme } from 'theme/themes';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle<{ theme: ITheme }>`

  ${reset}

  /* 
  https://styled-components.com/docs/faqs#what-do-i-need-to-do-to-migrate-to-v5

  Note regarding css @import and createGlobalStyle
  At this time we do not recommend using @import within cGS due to some 
  issues with how browsers process @import via the CSSOM APIs. 
  Instead it's best to place these in your core index.html file (generated or static) 
  within a typical <style> tag.

  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@300;400;500;i,600&display=swap');

  @import url('https://fonts.googleapis.com/css2?family=Akronim&display=swap');
  */

  body {
    background: ${({ theme }) => theme.palette.backgrounds.primary};
    color: ${({ theme }) => theme.palette.colors.primary};
    font-family: ${({ theme }) => theme.typography.primary};
  }
  
  * {
    font-family: ${({ theme: { typography } }) => typography.primary};  
  }

  a {
    font-family: ${({ theme }) => theme.typography.primary};
    text-decoration: none;
    color: ${({ theme }) => theme.palette.colors.primary};
    &:hover, &::active, &:focus {
      color: ${({ theme }) => theme.palette.colors.primary};
    }
  }
`;
