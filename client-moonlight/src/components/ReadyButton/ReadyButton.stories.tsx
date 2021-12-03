import { Story, Meta } from '@storybook/react';

import { IReadyButton } from 'components/ReadyButton/IReadyButton';
import ReadyButtonComponent from './ReadyButton';

export default {
  title: 'Components/ReadyButton',
  component: ReadyButtonComponent,
} as Meta;

const Template: Story<IReadyButton> = (args) => <ReadyButtonComponent {...args} />;

export const ReadyButton = Template.bind({});

ReadyButton.args = {
  id: 'test',
  isReady: false,
  state: 0,
};
