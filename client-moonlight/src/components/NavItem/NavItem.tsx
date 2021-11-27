import React from 'react';

import INavItem from 'components/NavItem/INavItem';
import * as Styled from './NavItem.styled';

const NavItem = ({
  children = 'Default',
  comingSoon = false,
  to = '/',
  exact = false,
  hamburger = false,
  onClick = () => { },
}: INavItem): JSX.Element => (
  <>
    {comingSoon ? (
      <Styled.ComingSoon
        onClick={onClick}
        hamburger={hamburger}
      >
        {children}
      </Styled.ComingSoon>
    ) : (
      <Styled.Link
        onClick={onClick}
        exact={exact}
        activeClassName="navigation-active-link"
        to={to}
        $hamburger={hamburger}
      >
        {children}
      </Styled.Link>
    )}
  </>
);

export default NavItem;
