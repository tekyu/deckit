import { Story, Meta } from '@storybook/react';
import withFormik from 'storybook-formik';

import ICheckbox from 'components/Checkbox/ICheckbox';
import CheckboxComponent from './Checkbox';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [withFormik],
} as Meta;

const Template: Story<ICheckbox> = (args) => <CheckboxComponent {...args} />;

export const Checkbox = Template.bind({});

Checkbox.parameters = {
  formik: {
    initialValues: {
      checkbox: false,
    },
  },
};

Checkbox.args = {
  name: 'checkkox',
  label: 'Default Label',
};
