import { authClient } from "@/lib/auth-client";
import ProfileLayoutClient from "./ProfileLayoutClient";
import { getSession } from "@/services/user.service";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {data} = await getSession();

  const userRole = data?.user?.role;
//   console.log(data);

  return (
    <ProfileLayoutClient userRole={userRole}>{children}</ProfileLayoutClient>
  );
}
