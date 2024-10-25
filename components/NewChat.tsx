"use client";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user
    ? (session?.user?.email as string)
    : "unknown";

  // Function
  const CreateNewChat = async () => {
    try {
      const doc = await addDoc(collection(db, "users", userEmail, "chats"), {
        userId: userEmail,
        createdAt: serverTimestamp(),
      });
      router.push(`/chat/${doc?.id}`);
    } catch (error) {
      console.log("Error adding document ", error);
    }
  };
  return (
    <button
      onClick={CreateNewChat}
      className="flex flex-1 justify-center items-center gap-2 p-2 border border-gray-500 rounded-md hover:bg-white/10 hover:border-[#212121] cursor-pointer duration-300"
    >
      <FaPlus />
      <span>New Chat</span>
    </button>
  );
};

export default NewChat;
