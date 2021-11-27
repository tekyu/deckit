import React from 'react';

export default interface IIcon {
  children?: React.ReactNode;
  clickable?: boolean;
  color?: string;
  onClick?: () => void;
  className?: string;
};
