import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getCart } from "@/services/cart.service";
import { getSession } from "@/services/user.service";
import { json } from "zod";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getSession();
  const session = data?.session;
  const user = data?.user;

  console.log(data);
  //   const logout=()=>{

  //   }
  return (
    <div>
      <Navbar session={session} user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
