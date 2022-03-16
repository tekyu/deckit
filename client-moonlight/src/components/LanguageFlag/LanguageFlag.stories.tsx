import { Story, Meta } from '@storybook/react';

import { ILanguageFlag } from 'components/LanguageFlag/ILanguageFlag';
import LanguageFlagComponent from './LanguageFlag';

export default {
  title: 'Components/LanguageFlag',
  component: LanguageFlagComponent,
  argTypes: {
    language: {
      options: ['en', 'pl', 'de'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<ILanguageFlag> = (args) => <LanguageFlagComponent {...args} />;

export const LanguageFlag = Template.bind({});

LanguageFlag.args = {
  language: 'en',
};
