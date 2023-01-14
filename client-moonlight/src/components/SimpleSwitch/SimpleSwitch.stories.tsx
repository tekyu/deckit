import { Story, Meta } from '@storybook/react';

import withFormik from 'storybook-formik';
import ISimpleSwitch from 'components/SimpleSwitch/ISimpleSwitch';
import Label from 'components/Label/Label';
import { Label as StyledLabel } from 'components/Label/Label.styled';
import styled from 'styled-components';
import SwitchComponent from './SimpleSwitch';

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

const Template: Story<ISimpleSwitch> = (args) => (
  <Container>
    <Label>Checked</Label>
    <SwitchComponent {...args} value />
    <Label>Unchecked</Label>
    <SwitchComponent {...args} value={false} />
    <Label />
    <SwitchComponent {...args} value={false} />
  </Container>
);

export const Switch = Template.bind({});

Switch.parameters = {
};

Switch.args = {
  name: 'switch',
};
