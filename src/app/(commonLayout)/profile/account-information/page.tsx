'use server'

import { getSession } from "@/services/user.service";
import AccountInformation from "./AccountInformation";

export default async function Page() {
  const { data } = await getSession();
//   console.log(data);

  return <AccountInformation user={data.user} />;
}
