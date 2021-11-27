import { Story, Meta } from '@storybook/react';

import RoomContainerComponent from './RoomContainer';

export default {
  title: 'Pages/RoomContainer',
  component: RoomContainerComponent,
} as Meta;

const Template: Story = (args) => <RoomContainerComponent {...args} />;

export const RoomContainer = Template.bind({});
