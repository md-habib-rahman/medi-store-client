"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function LogOut() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await authClient.signOut();
      console.log(res);
      if (res?.data?.success) {
        toast.success("Logged out successfully!");
		

        router.push("/");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Logout failed");
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Logout</h1>
      <p className="text-gray-600 mb-6">Are you sure to logout?</p>
      <div className="flex justify-center space-x-4">
        <Link href={"/profile/account-information"}>
          <Button variant={"outline"}>Cancel</Button>
        </Link>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default LogOut;
