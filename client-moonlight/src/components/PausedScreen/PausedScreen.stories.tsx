import { Story, Meta } from '@storybook/react';

import { IPausedScreen } from 'components/PausedScreen/IPausedScreen';
import PausedScreenComponent from './PausedScreen';

export default {
  title: 'Components/PausedScreen',
  component: PausedScreenComponent,
} as Meta;

const Template: Story<IPausedScreen> = (args) => <PausedScreenComponent {...args} />;

export const PausedScreen = Template.bind({});

PausedScreen.args = {
  isOwner: false,
};
