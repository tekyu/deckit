import { Story, Meta } from '@storybook/react';

import { IAddSeat } from 'components/AddSeat/IAddSeat';
import AddSeatComponent from './AddSeat';

export default {
  title: 'Components/AddSeat',
  component: AddSeatComponent,
} as Meta;

const Template: Story<IAddSeat> = (args) => <AddSeatComponent {...args} />;

export const AddSeat = Template.bind({});

AddSeat.args = {
  children: 'AddSeat',
};
