import Navbar from "@/components/shared/Navbar";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {




  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default CommonLayout;
