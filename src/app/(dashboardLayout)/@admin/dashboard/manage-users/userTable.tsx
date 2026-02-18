"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Pencil, X } from "lucide-react";
import { formatDate } from "@/constants/formatDate";
import { Switch } from "@/components/ui/switch";
import { UserStatusSwitch } from "./UserStatusSwitch";
import { Button } from "@/components/ui/button";
import { UpdateUserRoleModal } from "./UpdateUserRoleModal";
import { useState } from "react";
import { AllUser } from "@/types/user.types";

const UserTable = ({ data: items }: { data: AllUser[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const handleEdit = (user: AllUser) => {
    setOpen(true);
    setSelectedUser(user);
  };

  return (
    <div className="w-full">
      <div className="[&>div]:rounded-sm [&>div]:border">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>is Verified</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead>Created On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={item.image} alt={item.name} />
                      <AvatarFallback className="text-xs">
                        {item.name}
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{item.name}</div>
                  </div>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.emailVerified ? <Check /> : <X />}</TableCell>
                <TableCell>
                  {" "}
                  <UserStatusSwitch id={item.id} status={item.status} />
                </TableCell>
                <TableCell className="flex items-center justify-around gap-2">
                  {item.role}
                  <Button
                    variant={"outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    {" "}
                    <Pencil />
                  </Button>
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UpdateUserRoleModal
        setOpen={setOpen}
        open={open}
        onOpenChange={setOpen}
        user={selectedUser}
      />
    </div>
  );
};

export default UserTable;
