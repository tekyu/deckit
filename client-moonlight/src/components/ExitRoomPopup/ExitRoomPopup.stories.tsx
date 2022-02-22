import { Story, Meta } from '@storybook/react';

import { IExitRoomPopup } from 'components/ExitRoomPopup/IExitRoomPopup';
import ExitRoomPopupComponent from './ExitRoomPopup';

export default {
  title: 'Components/ExitRoomPopup',
  component: ExitRoomPopupComponent,
} as Meta;

const Template: Story<IExitRoomPopup> = (args) => <ExitRoomPopupComponent {...args} />;

export const ExitRoomPopup = Template.bind({});

ExitRoomPopup.args = {
  closeHandler: () => {},
};
