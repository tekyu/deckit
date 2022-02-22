import { Story, Meta } from '@storybook/react';

import { IBackdrop } from 'components/Backdrop/IBackdrop';
import BackdropComponent from './Backdrop';

export default {
  title: 'Components/Backdrop',
  component: BackdropComponent,
} as Meta;

const Template: Story<IBackdrop> = (args) => <BackdropComponent {...args} />;

export const Backdrop = Template.bind({});

Backdrop.args = {
  children: 'Backdrop',
};
