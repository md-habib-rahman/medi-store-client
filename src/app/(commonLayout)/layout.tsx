import Navbar from "@/components/shared/Navbar";
import { getSession } from "@/services/user.service";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getSession();
  const session = data?.session;
  console.log(data);
  //   const logout=()=>{

  //   }
  return (
    <div>
      <Navbar session={session} />
      {children}
    </div>
  );
};

export default CommonLayout;
