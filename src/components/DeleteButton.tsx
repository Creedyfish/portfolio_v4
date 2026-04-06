"use client";
import { Button } from "./ui/Button";
import { X } from "lucide-react";

type ButtonProps = {
  action: (slug: string) => Promise<{ success: boolean }>;
  slug: string;
};

export default function DeleteButton({
  action,
  slug,
  ...props
}: ButtonProps & Omit<React.ComponentProps<typeof Button>, "onPress">) {
  return (
    <Button
      {...props}
      onPress={() => {
        if (!confirm("Are you sure?")) return;
        action(slug);
      }}
    >
      <X />
    </Button>
  );
}
