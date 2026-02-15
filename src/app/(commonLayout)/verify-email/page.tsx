import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

type TokenProps = {
  searchParams: {
    token?: string;
  };
};

export default async function VerifyEmailPage({ searchParams }: TokenProps) {
  const { token } = await searchParams;

  //   console.log({token});

  if (!token) {
    return <p>Invalid or missing verification token.</p>;
  }

  const result = await authClient.verifyEmail({
    query: {
      token,
    },
  });

  console.log(result);

  if (!result?.data?.status) {
    return <p>Verification failed or token expired.</p>;
  }

  return (
    <div className="flex min-h-80 items-center justify-center">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Email Verified ✅</h1>
        <p>You can now log in to your account.</p>
        <div className="flex justify-around">
          <Link href={"/login"}>
            <Button variant={"rumedi_primary"}>Login</Button>
          </Link>
          <Link href={"/"}>
            <Button variant={"rumedi_secondary"}>Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
