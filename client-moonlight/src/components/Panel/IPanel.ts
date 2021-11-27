import React from 'react';

export default interface IPanel {
  children?: React.ReactNode;
  title?: string;
  toolbar?: React.ReactNode;
  icon?: React.ReactNode;
  palette?: string;
  variant?: string;
};
