"use client";
import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsArrowUpRight } from "react-icons/bs";
import { TbPaperclip } from "react-icons/tb";

interface Props {
  id: string;
}

const ChatInput = ({ id }: Props) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("gpt-3.5-turbo");
  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user
    ? (session?.user?.email as string)
    : "Unknown";
  const chatId = id;

  // Function
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPrompt("");
    if (!prompt) return;
    const input = prompt.trim();
    const message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: userEmail,
        name: session?.user?.name || "N/A",
        avatar:
          session?.user?.image ||
          "https://res.cloudinary.com/diuf2wkef/image/upload/v1729832899/logo_leoytz.png",
      },
    };

    try {
      setLoading(true);
      let chatDocumentId = chatId;
      // if (!id) {
      //   const doc = await addDoc(
      //     collection(db, "users", userEmail, "chats"),
      //     message
      //   );
      //   chatDocumentId = doc?.id;
      //   router.push(`/chat/${doc?.id}`);
      // }

      if (!chatId) {
        const docRef = await addDoc(
          collection(db, "users", userEmail, "chats"),
          {
            userId: userEmail,
            createdAt: serverTimestamp(),
          }
        );
        chatDocumentId = docRef.id;
        router.push(`/chat/${chatDocumentId}`);
      }

      await addDoc(
        collection(db, "users", userEmail, "chats", chatDocumentId, "messages"),
        message
      );
      setPrompt('')
      // toast notification to say loading.
      const notification = toast.loading("ChatGPT is thinking...");
      // Chat with gpt
      await fetch("/api/askchat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          id: chatDocumentId,
          model,
          session: userEmail,
        }),
      }).then(async (res) => {
        const data = await res.json();
        if (data?.success) {
          toast.success(data?.message, {
            id: notification,
          });
        } else {
          toast.success(data?.message, {
            id: notification,
          });
        }
      });
    } catch (error) {
      console.log("Error sanding message", error);
      toast.error("Something is wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" w-full px-4 flex flex-col items-center justify-center">
      <form
        onSubmit={sendMessage}
        className="bg-[#2F2F2F] px-2 py-2 rounded-full flex items-center gap-3 max-w-3xl w-full"
      >
        <TbPaperclip className="text-xl -rotate-45 font-semibold" />
        <input
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          value={prompt}
          placeholder="Message ChatGPT"
          className="bg-transparent outline-none w-full"
        />
        <button
          type="submit"
          disabled={!prompt}
          className="bg-white
               text-black p-2 rounded-full disabled:bg-white/30"
        >
          <BsArrowUpRight className="-rotate-45 text-sm" />
        </button>
      </form>
      <p className="text-xs text-gray-400 mt-2">
        ChatGPT can make mistake. Check important info.
      </p>
      {/* model selection */}
    </div>
  );
};

export default ChatInput;
