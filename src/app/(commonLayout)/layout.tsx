import Footer from "@/components/shared/Footer";
import Loading from "@/components/shared/Loader";
import Navbar from "@/components/shared/Navbar";
import { getSession } from "@/services/user.service";
import { Loader } from "lucide-react";
import { Suspense } from "react";


const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  const { data } = await getSession();
  const session = data?.session;
  const user = data?.user;

  console.log(data);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Navbar session={session} user={user} />
      </Suspense>

      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
