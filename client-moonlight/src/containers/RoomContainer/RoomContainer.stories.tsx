import { Story, Meta } from '@storybook/react';

import IRoomContainer from 'containers/RoomContainer/IRoomContainer';
import RoomContainerComponent from './RoomContainer';

export default {
  title: 'Pages/RoomContainer',
  component: RoomContainerComponent,
} as Meta;

const Template: Story<IRoomContainer> = (args) => <RoomContainerComponent {...args} />;

export const RoomContainer = Template.bind({});

RoomContainer.args = {
  children: 'RoomContainer',
};
