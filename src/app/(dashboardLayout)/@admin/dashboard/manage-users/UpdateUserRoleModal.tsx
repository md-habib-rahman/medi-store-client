"use client";

import { startTransition, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userUpdateRole } from "@/actions/action";
import { useRouter } from "next/navigation";

const ROLES = ["ADMIN", "SELLER", "CUSTOMER"];

export function UpdateUserRoleModal({ setOpen, open, onOpenChange, user }) {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;

    setLoading(true);
    const toastId = toast.loading("Updating role...");

    try {
      startTransition(async () => {
        const res = await userUpdateRole(user?.id, {
          role,
        });
        if (!res.success) {
          toast.error("Failed to update user role", { id: toastId });
        } else {
          toast.success("User role updated", { id: toastId });
          router.push("/dashboard/manage-users");
        }
      });
    } catch (err: any) {
      toast.error(err.message || "Update failed", { id: toastId });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Role</DialogTitle>
        </DialogHeader>

        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>

          <SelectContent>
            {ROLES.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button
            onClick={handleUpdate}
            disabled={loading || role === user?.role}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
