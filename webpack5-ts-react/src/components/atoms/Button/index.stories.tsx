import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import * as React from 'react';

import Button, { ButtonProps } from '.';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return <Button {...args} />;
};

export const Default = Template.bind({});

Default.args = {
  onClick: action('onClick'),
  text: 'default button',
};
