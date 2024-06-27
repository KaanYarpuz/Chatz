import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function ChatInput({ handleSendMessage }) {
  const [msg, setMsg] = useState("");


  const sendChat = (event) => {
    event.preventDefault();
    if (msg.trim()) {
      handleSendMessage(msg);
      setMsg("");
    }
  };

  return (
    <div className="flex items-center p-4 bg-gray-900">
      <form className="flex items-center w-full bg-white bg-opacity-20 rounded-full" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="flex-1 border-none bg-transparent text-white p-2 text-xl placeholder-gray-400 focus:outline-none"
        />
        <button type="submit" className="border-none bg-purple-500 text-white p-4 rounded-full flex items-center justify-center cursor-pointer">
          <IoMdSend className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
