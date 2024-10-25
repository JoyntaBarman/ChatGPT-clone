"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ChatRow from "./ChatRow";

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email as string, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  // console.log(chats?.docs)

  useEffect(() => {
    if (!chats) {
      router.push("/");
    }
  }, [chats, router]);

  return (
    <div className="p-3 overflow-hidden">
      <div className="flex items-center gap-2">
        <Link
          href={"/"}
          className="p-2 border border-gray-500 rounded-md hover:bg-white/10 hover:border-[#212121] duration-300"
        >
          <FaHome size={20} />
        </Link>
        <NewChat />
      </div>
      <div>selection model</div>
      <div>
        {session?.user ? (
          <>
            <p className="p-3 text-sm font-medium">Chat History</p>

            <div className="h-[60vh] overflow-y-auto">
              {loading ? (
                <div className="flex flex-col flex-1 space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="bg-zinc-800 w-full h-8 rounded-md animate-pulse" />
                  ))}
                </div>
              ) : chats?.docs?.length ? (
                <div className="flex flex-col space-y-2">
                  {chats?.docs.map((chat, index) => (
                    <ChatRow key={index} id={chat?.id} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-white/50 flex justify-center">
                  No chat history.
                </div>
              )}
            </div>
          </>
        ) : (
          !loading && (
            <div className="text-sm flex flex-col items-center justify-center mt-4">
              <p>Please login to see history </p>{" "}
              <Link href={"/signin"} className="underline">
                Sign In
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
