import { Story, Meta } from '@storybook/react';

import ThemeChangerComponent from './ThemeChanger';

export default {
  title: 'Components/ThemeChanger',
  component: ThemeChangerComponent,
} as Meta;

const Template: Story = (args) => <ThemeChangerComponent {...args} />;

export const ThemeChanger = Template.bind({});

ThemeChanger.args = {
  children: 'ThemeChanger',
};
