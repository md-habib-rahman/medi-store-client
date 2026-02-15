export const dynamic = "force-dynamic";
import { getSession } from "@/services/user.service";
import AccountInformation from "./AccountInformation";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data } = await getSession();
  //   console.log(data);

  if (!data?.user) {
    redirect("/login");
  }

  return <AccountInformation user={data.user} />;
}
