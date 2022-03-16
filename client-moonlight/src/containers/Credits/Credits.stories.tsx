import { Story, Meta } from '@storybook/react';

import CreditsComponent from './Credits';

export default {
  title: 'Components/Credits',
  component: CreditsComponent,
} as Meta;

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: Story = (args) => <CreditsComponent {...args} />;

export const Credits = Template.bind({});

Credits.args = {
  children: 'Credits',
};
