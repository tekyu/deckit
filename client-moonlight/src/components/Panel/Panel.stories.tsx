import React from 'react';

import { Story, Meta } from '@storybook/react';

import IPanel from 'components/Panel/IPanel';
import {
  BiHomeCircle, BiLineChart, BiPlus, BiX,
} from 'react-icons/bi';
import Icon from 'components/Icon/Icon';
import PanelComponent from './Panel';

export default {
  title: 'Components/Panel',
  component: PanelComponent,
  argTypes: {
    palette: {
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      control: {
        type: 'radio',
      },
    },
    variant: {
      options: ['light', 'main', 'dark'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: Story<IPanel> = (args) => <PanelComponent {...args} />;

const Toolbar = (): JSX.Element => (
  <>
    <Icon><BiPlus size={18} /></Icon>
    <Icon><BiLineChart size={18} /></Icon>
    <Icon><BiX size={18} /></Icon>
  </>
);

export const Full = Template.bind({});

Full.args = {
  children: 'Panel Content',
  toolbar: <Toolbar />,
  title: 'Panel title',
  icon: <BiHomeCircle size={24} />,
};

export const WithTitle = Template.bind({});

WithTitle.args = {
  title: 'Panel title',
  children: 'Panel Content',
};

export const WithIcon = Template.bind({});

WithIcon.args = {
  children: 'Panel Content',
  title: 'Panel title',
  icon: <BiHomeCircle size={24} />,
};

export const WithToolbar = Template.bind({});

WithToolbar.args = {
  children: 'Panel Content',
  title: 'Panel title',
  toolbar: <Toolbar />,
};

export const OnlyIcon = Template.bind({});

OnlyIcon.args = {
  children: 'Panel Content',
  icon: <BiHomeCircle size={24} />,
};

export const OnlyToolbar = Template.bind({});

OnlyToolbar.args = {
  children: 'Panel Content',
  toolbar: <Toolbar />,
};

export const Blank = Template.bind({});

Blank.args = {
  children: 'Panel Content',
};

export const Colored = Template.bind({});

Colored.args = {
  children: 'Panel Content',
  palette: 'primary',
  title: 'Panel title',
  toolbar: <Toolbar />,
  icon: <BiHomeCircle size={24} />,
};
