import { Story, Meta } from '@storybook/react';

import RoomSettingsComponent from './RoomSettings';

export default {
  title: 'Components/RoomSettings',
  component: RoomSettingsComponent,
} as Meta;

const Template: Story = () => <RoomSettingsComponent />;

export const RoomSettings = Template.bind({});

RoomSettings.args = {
  children: 'RoomSettings',
};
