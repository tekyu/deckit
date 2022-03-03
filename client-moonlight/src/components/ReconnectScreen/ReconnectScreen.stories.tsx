import { Story, Meta } from '@storybook/react';

import { IReconnectScreen } from 'components/ReconnectScreen/IReconnectScreen';
import ReconnectScreenComponent from './ReconnectScreen';

export default {
  title: 'Components/ReconnectScreen',
  component: ReconnectScreenComponent,
} as Meta;

const Template: Story<IReconnectScreen> = (args) => <ReconnectScreenComponent {...args} />;

export const ReconnectScreen = Template.bind({});

ReconnectScreen.args = {
  roomId: 'chattyfish96',
};
