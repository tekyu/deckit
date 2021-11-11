import { Story, Meta } from '@storybook/react';

import withFormik from 'storybook-formik';
import ISwitch from 'components/Switch/ISwitch';
import Label from 'components/Label/Label';
import { Label as StyledLabel } from 'components/Label/Label.styled';
import styled from 'styled-components';
import SwitchComponent from './Switch';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${StyledLabel} {
    &:first-of-type {
      margin-top: 0;
    }
    margin-top: 30px;
  }
`;

export default {
  title: 'Components/Switch',
  component: SwitchComponent,
  decorators: [withFormik],
} as Meta;

const Template: Story<ISwitch> = (args) => (
  <Container>
    <Label>Checked</Label>
    <SwitchComponent {...args} value />
    <Label>Unchecked</Label>
    <SwitchComponent {...args} value={false} />
    <Label />
    <SwitchComponent {...args} value={false} label="Labeled" />
  </Container>
);

export const Switch = Template.bind({});

Switch.parameters = {
  formik: {
    initialValues: {
      switch: 'Default value',
    },
  },
};

Switch.args = {
  name: 'switch',
};
