import React from 'react';

import { Story, Meta } from '@storybook/react';

import IComingSoon from 'components/ComingSoon/IComingSoon';
import ComingSoonComponent from './ComingSoon';

export default {
  title: 'Components/ComingSoon',
  component: ComingSoonComponent,
} as Meta;

const Template: Story<IComingSoon> = (args) => <ComingSoonComponent {...args} />;

export const ComingSoon = Template.bind({});

ComingSoon.args = {
  children: 'Fast Game',
};
