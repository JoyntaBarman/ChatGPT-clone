// 'use client'
import { db } from "@/firebase";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { BiSolidTrash } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";

interface Props {
  id: string;
}

const ChatRow = ({ id }: Props) => {
  const [active, setActive] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email as string;

  const [chats] = useCollection(
    query(
      collection(db, "users", session?.user?.email as string, "chats"),
      orderBy("createdAt", "desc")
    )
  );

  const [messages, loading] = useCollection(
    session &&
      query(collection(db, "users", userEmail, "chats", id, "messages"))
  );
  const chat =
    messages?.docs[messages?.docs?.length - 1]?.data().text || "New Chat";

  useEffect(() => {
    if (!pathName) return;
    setActive(pathName.includes(id));
  }, [pathName, id]);

  const removeChat = async () => {
    await deleteDoc(
      doc(db, "users", session?.user?.email as string, "chats", id)
    );

    if (active) {
      const nextChat = chats?.docs.find((chat) => chat?.id !== id);
      if (nextChat) {
        router.push(`/chat/${nextChat?.id}`);
      } else {
        router.push(`/`);
      }
    }
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`hover:bg-white/10 rounded-md flex  duration-300 items-center gap-2 py-1 px-2 ${
        active ? "bg-white/10" : "bg-transparent"
      }`}
    >
      <IoChatboxOutline />
      <p className="flex-1 truncate">{chat}</p>
      <BiSolidTrash
        onClick={removeChat}
        className="hover:text-red-700 duration-300"
      />
    </Link>
  );
};

export default ChatRow;
