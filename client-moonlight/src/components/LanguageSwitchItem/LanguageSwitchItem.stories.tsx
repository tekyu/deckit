import { Story, Meta } from '@storybook/react';

import { ILanguageSwitchItem } from 'components/LanguageSwitchItem/ILanguageSwitchItem';
import LanguageSwitchItemComponent from './LanguageSwitchItem';

export default {
  title: 'Components/LanguageSwitchItem',
  component: LanguageSwitchItemComponent,
} as Meta;

const Template: Story<ILanguageSwitchItem> = (args) => <LanguageSwitchItemComponent {...args} />;

export const LanguageSwitchItem = Template.bind({});

LanguageSwitchItem.args = {
  language: 'en',
};
