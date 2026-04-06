import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Timezone',
    options: [
      { value: 'utc', label: 'UTC' },
      { value: 'est', label: 'Eastern (EST)' },
      { value: 'pst', label: 'Pacific (PST)' },
    ],
    helperText: 'Choose your local timezone.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    errorMessage: 'Please select a country.',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small select',
    options: countryOptions,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large select',
    options: countryOptions,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    options: countryOptions,
    disabled: true,
  },
};
