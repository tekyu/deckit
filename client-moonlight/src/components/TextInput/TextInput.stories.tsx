import React from 'react';

import { Story, Meta } from '@storybook/react';
import withFormik from 'storybook-formik';
import ITextInput from 'components/TextInput/ITextInput';
import TextInputComponent from './TextInput';

export default {
  title: 'Components/TextInput',
  component: TextInputComponent,
  decorators: [withFormik],
} as Meta;

const Template: Story<ITextInput> = (args) => <TextInputComponent {...args} />;

export const TextInput = Template.bind({});

TextInput.parameters = {
  formik: {
    initialValues: {
      textinput: 'Default value',
    },
  },
};

TextInput.args = {
  name: 'textinput',
  showBorder: false,
  alignCenter: false,
};

export const WithLabel = Template.bind({});

WithLabel.parameters = {
  formik: {
    initialValues: {
      textinput: 'default value',
    },
  },
};

WithLabel.args = {
  name: 'textinput',
  showBorder: true,
  label: 'Default Label',
};

export const WithPlaceholder = Template.bind({});

WithPlaceholder.parameters = {
  formik: {
    initialValues: {
      textinput: '',
    },
  },
};

WithPlaceholder.args = {
  name: 'textinput',
  showBorder: true,
  label: 'Default Label',
  placeholder: 'Default placeholder',
};
