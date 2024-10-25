"use client";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

interface Props {
  id: string;
}
const Chat = ({ id }: Props) => {
  const { data: session } = useSession();
  const bottomRef = useRef<HTMLDivElement>(null);
  const userEmail = (session?.user?.email as string) || "Unknown";
  const [messages] = useCollection(
    query(
      collection(db, "users", userEmail, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );


  useEffect(() => {
    if (bottomRef?.current) {
      bottomRef?.current?.scrollIntoView({behavior: "smooth"})
    }
  }, [messages]);
  return (
    <div className="flex flex-col space-y-8">
      {messages?.docs.length ? (
        messages?.docs.map((message, index) => (
          <Message key={index} message={message.data()} />
        ))
      ) : (
        <div>Empty Chat!</div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;
