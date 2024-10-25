import {
  advice,
  analysis,
  code,
  docs,
  help,
  image,
  plan,
  surprise,
} from "@/Images/Images";
import Image from "next/image";
import React from "react";

const ChatHelp = () => {
  const chatData = [
    { icon: image, text: "Create Image", color: "" },
    {
      icon: docs,
      text: "Summarize text",
      color: "",
    },
    {
      icon: surprise,
      text: "Surprise me",
      color: "",
    },
    {
      icon: plan,
      text: "Make a plane",
      color: "",
    },
    {
      icon: help,
      text: "Help me write",
      color: "",
    },
    {
      icon: advice,
      text: "Get advice",
      color: "",
    },
    {
      icon: analysis,
      text: "analyze data",
      color: "",
    },
    {
      icon: code,
      text: "Code",
      color: "",
    },
  ];
  return (
    <div className="flex items-center gap-3 flex-wrap justify-center max-w-3xl text-gray-400 text-sm">
      {chatData.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 border border-gray-600 px-3 py-1 rounded-full cursor-pointer hover:bg-white/5 duration-300"
        >
          <Image src={item?.icon} alt={item?.text} />
          <p className="text-nowrap">{item?.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatHelp;
