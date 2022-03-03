import { Story, Meta } from '@storybook/react';

import LanguageSwitchComponent from './LanguageSwitch';

export default {
  title: 'Components/LanguageSwitch',
  component: LanguageSwitchComponent,
} as Meta;

const Template: Story = (args) => <LanguageSwitchComponent {...args} />;

export const LanguageSwitch = Template.bind({});

LanguageSwitch.args = {
  children: 'LanguageSwitch',
};
