"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchJwt = async () => {
      const jwt = await sessionStorage.getItem("jwt");
      console.log(jwt);
      if (jwt) {
        router.push("/");
      }
    };

    fetchJwt();
  }, []);
  const onSignIn = () => {
    GlobalApi.SignIn(email, password).then(
      (res) => {
        console.log(res.data.user);
        console.log(res.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("jwt", res.data.jwt);
        toast("Sign in successfully.");
        router.push("/");
      },
      (e) => {
        console.log(e);
        toast("Server Error!!!");
      },
    );
  };
  return (
    <div className="my-20 flex items-baseline justify-center">
      <div className="flex flex-col items-center justify-center border border-gray-200 bg-slate-100 p-10">
        <Image src="/logo.png" height={200} width={200} alt="logo" />
        <h2 className="text-3xl font-bold">Sign In </h2>
        <h2 className="text-gray-500">
          Enter your email and password to sign in
        </h2>
        <div className="mt-7 flex w-full flex-col gap-5 ">
          {/* <Input
            placeholder="Username"
            className="outline-none"
            onChange={(e) => setUserName(e.target.value)}
          /> */}
          <Input
            placeholder="name@example.com"
            className="outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            className="outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onSignIn()} disabled={!(email || password)}>
            sign in
          </Button>
          <p>
            Don't have an account? &nbsp;
            <Link href={"/create-account"} className="text-green-500 underline">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
