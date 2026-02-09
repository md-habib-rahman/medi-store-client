"use client";

import { userUpdateStatus } from "@/actions/action";
import { Switch } from "@/components/ui/switch";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type UserStatusSwitchProps = {
  id: string;
  status: "ACTIVE" | "INACTIVE";
};

export function UserStatusSwitch({ id, status }: UserStatusSwitchProps) {
  const [checked, setChecked] = useState(status === "ACTIVE");
  const [isPending, startTransition] = useTransition();

  const handleToggle = async (value: boolean) => {
    const newStatus = value ? "ACTIVE" : "INACTIVE";

    setChecked(value);

    startTransition(async () => {
      const res = await userUpdateStatus(id, {
        status: value ? "ACTIVE" : "INACTIVE",
      });

      if (!res.success) {
        setChecked(!value);
        toast.error("Failed to update status");
      } else {
        toast.success("User status updated");
      }
    });
  };

  return <Switch
        checked={checked}
        onCheckedChange={handleToggle}
        disabled={isPending} 
      />;
}
