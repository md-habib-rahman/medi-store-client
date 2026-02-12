import { redirect } from "next/navigation";

const page = () => {
  return redirect("/profile/account-information");
};

export default page;
