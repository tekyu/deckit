import { Story, Meta } from '@storybook/react';

import ISliderWithTooltip from 'components/SliderWithTooltip/ISliderWithTooltip';
import withFormik from 'storybook-formik';
import SliderWithTooltipComponent from './SliderWithTooltip';

export default {
  title: 'Components/SliderWithTooltip',
  component: SliderWithTooltipComponent,
  decorators: [withFormik],
} as Meta;

const Template: Story<ISliderWithTooltip> = (args) => <SliderWithTooltipComponent {...args} />;

export const SliderWithTooltip = Template.bind({});

SliderWithTooltip.parameters = {
  formik: {
    initialValues: {
      slider: 30,
    },
  },
};

SliderWithTooltip.args = {
  name: 'slider',
  sliderProps: {
    min: 2,
    max: 60,
    defaultValue: 30,
    step: 1,
  },
};
