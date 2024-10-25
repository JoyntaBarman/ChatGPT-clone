import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import { db } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";

interface Props {
  params: {
    id: string
  }
}

const ChatPage = ({ params }: Props) => {
  
  return (
    <div className="w-full h-screen max-w-3xl flex flex-col items-center justify-between mx-auto overflow-x-auto ">
      <div className="flex-1 max-w-3xl w-full my-20">
        <Chat id={params?.id} />
      </div>
      <div className="w-[80%] flex justify-center fixed bottom-0 bg-[#212121]">
        <ChatInput id={params?.id} />
      </div>
    </div>
  );
};

export default ChatPage;
