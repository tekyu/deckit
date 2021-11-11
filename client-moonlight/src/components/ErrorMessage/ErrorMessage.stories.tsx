import { Story, Meta } from '@storybook/react';

import IErrorMessage from 'components/ErrorMessage/IErrorMessage';
import withFormik from 'storybook-formik';
import ErrorMessageComponent from './ErrorMessage';

export default {
  title: 'Components/ErrorMessage',
  component: ErrorMessageComponent,
  decorators: [withFormik],
} as Meta;

const Template: Story<IErrorMessage> = (args) => <ErrorMessageComponent {...args} />;

export const ErrorMessage = Template.bind({});

ErrorMessage.parameters = {
  formik: {
    initialValues: {
      name: '',
    },
  },
};
ErrorMessage.args = {
  name: 'name',
};
