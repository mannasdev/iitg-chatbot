"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

interface ChatMessage {
  sender: "user" | "assistant";
  message: string;
}

export default function Component() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);

  const handleSubmit = async () => {
    try {
      setChat((prevChat) => [...prevChat, { sender: "user", message: input }]);
      setInput("");

      const res = await axios.post("/api/ask-pplx", {
        input,
      });
      console.log(res.data.choices[0].message.content);

      handleReceive(res.data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReceive = (message: string) => {
    setChat((prevChat) => [...prevChat, { sender: "assistant", message }]);
  };

  return (
    <>
      <nav className="w-screen h-[10vh] flex items-center">
        <Image
          src="/iitg-logo.png"
          alt="iitg-logo"
          width={55}
          height={55}
          className="ml-5"
        ></Image>
      </nav>
      <div className="flex flex-col h-[90vh] max-h-[90vh] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className={`flex flex-col items-start space-y-2`}>
            <div
              className={`bg-${"white dark:bg-gray-800 text-gray-900 dark:text-gray-100"} px-4 py-3 rounded-lg max-w-[80%]`}
            >
              <p>HI, you can ask anything related to the course here !</p>
            </div>
          </div>
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col items-${
                msg.sender === "user" ? "end" : "start"
              } space-y-2`}
            >
              <div
                className={`bg-${
                  msg.sender === "user"
                    ? "blue-500 text-white"
                    : "white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                } px-4 py-3 rounded-lg max-w-[80%]`}
              >
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 flex items-center space-x-2">
          <input
            className="flex-1 bg-gray-100 dark:bg-gray-700 border-none rounded-lg px-4 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSubmit}
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
}

function SendIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
