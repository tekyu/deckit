import React from 'react';
import { SvgIcon } from '@material-ui/core';

interface ISvgIconWrapper {
  path: string;
  viewBox: string;
  [x: string]: any;
}

const SvgIconWrapper = ({ path, viewBox = '0 0 24 24', ...props }: ISvgIconWrapper): JSX.Element => (
  <SvgIcon {...props} viewBox={viewBox}>
    {path}
  </SvgIcon>
);

export default SvgIconWrapper;
