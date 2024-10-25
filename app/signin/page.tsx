import { signIn } from "@/auth";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <div className="fixed w-full h-full bg-black left-0 flex items-center justify-center opacity-90 ">
      <Link
        href={"/"}
        className="flex gap-2 items-center absolute left-4 top-4 text-white"
      >
        <FaArrowLeft />
        Back
      </Link>
      <div className="w-1/3 bg-[#2f2f2f] rounded-md py-10 text-center">
        <h1 className="text-3xl font-semibold tracking-wide text-center">
          Sign In
        </h1>
        <p className="text-sm mt-2">Welcome back to ChatGPT clone.</p>
        <div>
          <form
            action={async (event) => {
              "use server";
              const provider = event.get('provider') as string;
              await signIn(provider, {redirectTo: "/"});
            }}
          >
            <button
              type="submit"
              name="provider"
              value={"google"}
              className="flex items-center gap-2 mx-auto bg-[#212121] hover:bg-[#212121]/50 px-4 py-2 mt-4 rounded-lg duration-300"
            >
              {" "}
              <FcGoogle size={24} /> Sign in with Google
            </button>

            <button
              type="submit"
              name="provider"
              value={"github"}
              className="flex items-center gap-2 mx-auto bg-[#212121] px-4 py-2 mt-4 rounded-lg"
            >
              {" "}
              <FaGithub size={24} /> Sign in with Github
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
