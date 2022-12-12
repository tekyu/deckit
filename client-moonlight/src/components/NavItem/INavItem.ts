import React from 'react';

export default interface INavLink {
  children?: React.ReactNode;
  comingSoon?: boolean;
  to?: string;
  exact?: boolean;
  hamburger?: boolean;
  onClick?: () => void
};
