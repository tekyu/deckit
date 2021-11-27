import { Story, Meta } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import MenuComponent from './Menu';

export default {
  title: 'Components/Menu',
  component: MenuComponent,
  decorators: [StoryRouter()],
} as Meta;

const Template: Story = (args) => <MenuComponent {...args} />;

export const Menu = Template.bind({});
