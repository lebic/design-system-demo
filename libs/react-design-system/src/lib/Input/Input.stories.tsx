import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be 3–20 characters.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    errorMessage: 'Password must be at least 8 characters.',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    variant: 'success',
    defaultValue: 'user@example.com',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small input',
    placeholder: 'Small size',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large input',
    placeholder: 'Large size',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    placeholder: 'Cannot type here',
    disabled: true,
  },
};
