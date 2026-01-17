// components/ui/TextArea.tsx
"use client";
import {
  TextField as AriaTextField,
  TextFieldProps as AriaTextFieldProps,
  TextArea as AriaTextArea,
  ValidationResult,
} from "react-aria-components";
import { tv } from "tailwind-variants";
import {
  Description,
  FieldError,
  Label,
  fieldBorderStyles,
} from "@/components/ui/Field";
import { composeTailwindRenderProps, focusRing } from "@/lib/react-aria-utils";

const textareaStyles = tv({
  extend: focusRing,
  base: "border-1 rounded-lg min-h-24 font-sans text-sm py-2 px-3 box-border transition resize-y",
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

export interface TextAreaProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextArea({
  label,
  description,
  errorMessage,
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "flex flex-col gap-1 font-sans",
      )}
    >
      {label && <Label>{label}</Label>}
      <AriaTextArea className={textareaStyles} />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
