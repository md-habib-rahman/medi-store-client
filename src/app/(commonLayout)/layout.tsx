import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { getSession } from "@/services/user.service";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getSession();
  const session = data?.session;
  const user = data?.user;

  console.log(data);

  return (
    <div>
      <Navbar session={session} user={user} />
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
