import type { Meta, StoryObj } from "@storybook/react";

import { Header } from "./header";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

/**
 * Header when user is logged out.
 */
export const LoggedOut: Story = {
  args: {
    loggedIn: false,
  },
};

/**
 * Header when user is logged in.
 */
export const LoggedIn: Story = {
  args: {
    loggedIn: true,
  },
};
