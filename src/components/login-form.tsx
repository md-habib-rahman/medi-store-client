"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./Form-schema";
import { authClient } from "@/lib/auth-client";
import { LoginPayload } from "@/types/login.types";
import { logIn } from "@/services/user.service";

const LoginForm = () => {
  const seachParams = useSearchParams();
  const redirect = seachParams.get("redirectPath");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit = async (data: LoginPayload) => {
    try {
      //   console.log(data);
      const res = await authClient.signIn.email(data);
      console.log(res);
      if (res?.data?.user) {
        toast.success("Logged in");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
          router.refresh();
        }
      } else {
        toast.error(res.error?.message);
      }
    } catch (error: any) {
      toast.error("Login Error");
    }
  };
  const demoCredentials = {
    admin: {
      email: "admin@live.com",
      password: "password1234",
    },
    landlord: {
      email: "habib1@live.com",
      password: "password1234",
    },
    seller: {
      email: "seller@live.com",
      password: "password1234",
    },
  };

  //   const session = authClient.useSession();
  // console.log(session)

  return (
    <div className="max-w-md w-full border-2 rounded-xl m-4 p-5">
      <div className="flex items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg  font-semibold">Login</h1>
          <small className="text-gray-600">
            Join us today and start your journey
          </small>
        </div>
      </div>
      <div className="flex items-center my-5 justify-around gap-2">
        <Button
          variant={"rumedi_primary_outline"}
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            form.setValue("email", demoCredentials.admin.email);
            form.setValue("password", demoCredentials.admin.password);
          }}
        >
          Demo Admin
        </Button>
        <Button
          variant={"rumedi_primary_outline"}
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            form.setValue("email", demoCredentials.landlord.email);
            form.setValue("password", demoCredentials.landlord.password);
          }}
        >
          Demo customer
        </Button>
        <Button
          variant={"rumedi_primary_outline"}
          size="sm"
          className="cursor-pointer"
          onClick={() => {
            form.setValue("email", demoCredentials.seller.email);
            form.setValue("password", demoCredentials.seller.password);
          }}
        >
          Demo seller
        </Button>
      </div>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant={"rumedi_primary"} className="w-full mb-3 cursor-pointer" type="submit">
            {isSubmitting ? "Logging..." : "login"}
          </Button>
          <div className="flex items-center justify-center">
            <small className="text-gray-600">
              Don&apos;t have any account?{" "}
              <Link href={"/register"} className="text-primary">
                Register
              </Link>
            </small>
          </div>

          <div className="flex items-center justify-center ">
            <Link href={"/"}>
              <Button variant={"rumedi_secondary_outline"} className="w-full cursor-pointer">
                Back To Home
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
