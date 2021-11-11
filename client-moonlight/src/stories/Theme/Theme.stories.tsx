import React from 'react';

import { Meta } from '@storybook/react';
import ThemeDisplay from 'stories/Theme/ThemeDisplay/ThemeDisplay';

export default {
  title: 'Theme/Theme',
  component: ThemeDisplay,
} as Meta;

export const Theme = (): JSX.Element => <ThemeDisplay />;
