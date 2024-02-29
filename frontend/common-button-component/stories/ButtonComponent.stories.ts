import { ButtonComponent } from "./ButtonComponent";

export default {
  title: "Button",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: [],
  addons: ["@storybook/addon-actions"],
};

export const Apply = {
  args: {
    children: "応募する",
    color: "blue",
    size: "medium",
    disabled: false,
  },
};

export const Delete = {
  args: {
    children: "削除する",
    color: "red",
    size: "small",
    disabled: false,
  },
};

export const Disabled = {
  args: {
    children: "削除する",
    color: "red",
    size: "small",
    disabled: true,
  },
};
