import { Story, Meta } from '@storybook/react';

import { ICard } from 'components/Card/ICard';
import CardComponent from './Card';

export default {
  title: 'Components/Card',
  component: CardComponent,
} as Meta;

const Template: Story<ICard> = (args) => <CardComponent {...args} />;

export const Card = Template.bind({});

Card.args = {
  id: '123',
  title: 'Card of 123',
  url: 'http://localhost:3011/card/1.jpg',
};
