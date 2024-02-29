import React from "react";
import Button from "@mui/material/Button";

type Color = "red" | "blue" | "green";
type Size = "small" | "medium" | "large";

export type ButtonComponentProps = {
  readonly children: JSX.Element;
  readonly color: Color;
  readonly size: Size;
  readonly disabled: boolean;
  readonly onClick: () => void;
};

const mapColorToTheme = (color: Color) => {
  switch (color) {
    case "red":
      return "error";
    case "blue":
      return "primary";
    case "green":
      return "success";
    default:
      return "primary";
  }
};

export const ButtonComponent = ({
  children,
  color,
  size,
  disabled,
  onClick,
}): JSX.Element => {
  return (
    <Button
      size={size}
      color={mapColorToTheme(color)}
      disabled={disabled}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
