import { Story, Meta } from '@storybook/react';

import { IMessage } from 'components/Message/IMessage';
import MessageComponent from './Message';

export default {
  title: 'Components/Message',
  component: MessageComponent,
} as Meta;

const Template: Story<IMessage> = (args) => <MessageComponent {...args} />;

export const Message = Template.bind({});

Message.args = {
  children: 'Message',
  special: false,
};
