import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaAngleDown } from "react-icons/fa";
import SignOut from "./SignOut";

const Heading = async () => {
  const session = await auth();
  return (
    <div className="absolute w-full flex items-center justify-between h-16 p-5 bg-[#212121]">
      <button
        className="text-xl font-semibold hover:bg-[#2F2F2F] px-3 py-2 rounded-md duration-300
       flex items-center gap-2 tracking-wide"
      >
        ChatGPT <FaAngleDown />
      </button>
      {session?.user ? (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8">
            <Image
              src={session?.user?.image as string}
              alt="ChatGPT clone"
              width={200}
              height={200}
              className="w-full h-full rounded-full"
            />
          </div>
          <SignOut/>
        </div>
      ) : (
        <Link
          href={"/signin"}
          className="bg-[#171717] hover:bg-[#282828] px-3 py-1 rounded-lg duration-300"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default Heading;
