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
import { Check, X } from "lucide-react";
import { formatDate } from "@/constants/formatDate";
import { Switch } from "@/components/ui/switch";
import { UserStatusSwitch } from "./UserStatusSwitch";

const UserTable = ({ data: items }) => {
  const handleChange = () => {};

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
              <TableHead>Role</TableHead>
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
                <TableCell>{item.role}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
