import { VariantProps } from "class-variance-authority";
import { buttonStyles } from "../../components/Button";
import { ComponentProps } from "react";

export type ButtonProps = VariantProps<typeof buttonStyles> &
  ComponentProps<"button">;
