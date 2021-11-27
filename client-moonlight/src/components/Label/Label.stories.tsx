import { Story, Meta } from '@storybook/react';

import ILabel from 'components/Label/ILabel';
import LabelComponent from './Label';

export default {
  title: 'Components/Label',
  component: LabelComponent,
} as Meta;

const Template: Story<ILabel> = (args) => <LabelComponent {...args} />;

export const Label = Template.bind({});

Label.args = {
  children: 'Label',
};
