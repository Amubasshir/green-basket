"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="my-20 flex items-baseline justify-center">
      <div className="flex flex-col items-center justify-center border border-gray-200 bg-slate-100 p-10">
        <Image src="/logo.png" height={200} width={200} alt="logo" />
        <h2 className="text-3xl font-bold">Create Account</h2>
        <h2 className="text-gray-500">
          Enter your email and password to create a new account
        </h2>
        <div className="mt-7 flex w-full flex-col gap-5 ">
          <Input
            placeholder="Username"
            className="outline-none"
            onChange={(e) => setUserName(e.target.value)}
          />
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
          <Button
            onClick={() => onCreateAccount()}
            // disabled={!(username || email || password)}
          >
            Create An Account
          </Button>
          <p>
            Already have an account? &nbsp;
            <Link href={"/sign-in"} className="text-green-500 underline">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
