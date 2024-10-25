import { DocumentData } from "firebase-admin/firestore";
import Image from "next/image";
import React from "react";

interface Props {
  message: DocumentData;
}

const Message = ({ message }: Props) => {
  const isChatGPT = message?.user?.name === "ChatGPT";

  return (
    <div>
      {
        <div className="flex items-start gap-4">
          {isChatGPT && (
            <div className="w-8 h-8  ">
              <Image
                src={message?.user?.avatar}
                alt="Image"
                width={200}
                height={200}
                className="w-full h-full rounded-full"
              />
            </div>
          )}
          <div
            className={`flex-1 flex flex-col   ${
              isChatGPT ? "items-start" : "items-end"
            }`}
          >
            <p
              className={`p-2 rounded-lg whitespace-pre-wrap ${
                isChatGPT ? "bg-transparent" : "bg-[#2f2f2f] max-w-xl"
              }`}
            >
              {message?.text}
            </p>
          </div>
        </div>
      }
    </div>
  );
};

export default Message;
