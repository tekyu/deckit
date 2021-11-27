import React from 'react';

import { Story, Meta } from '@storybook/react';

import IAvatar from 'components/Avatar/IAvatar';
import AvatarComponent from './Avatar';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
} as Meta;

const Template: Story<IAvatar> = (args) => <AvatarComponent {...args} />;

export const WithPlaceholder = Template.bind({});

WithPlaceholder.args = {
  url: '',
};

export const WithImage = Template.bind({});

WithImage.args = {
  url: 'https://cdn.vox-cdn.com/thumbor/JgCPp2BBxETY596wCp50ccosCfE=/0x0:2370x1574/1200x800/filters:focal(996x598:1374x976)/cdn.vox-cdn.com/uploads/chorus_image/image/68870438/Screen_Shot_2020_07_21_at_9.38.25_AM.0.png',
};
