import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import moment from "moment"; // Import moment.js for date formatting

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMessage = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, timestamp: new Date() });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg, timestamp: new Date() });
      });
    }
  }, [socket]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <div className="grid grid-rows-[10%_80%_10%] gap-1 overflow-hidden md:grid-rows-[15%_70%_15%]">
          <div className="flex justify-between items-center px-8">
            <div className="flex items-center gap-4">
              <div className="avatar"></div>
              <div className="username">
                <h2 className="text-white">{currentChat.username}</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 overflow-auto">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()} className={`message ${message.fromSelf ? "justify-end" : "justify-start"} flex items-center`}>
                  <div className={`content max-w-[40%] md:max-w-[70%] break-words p-4 text-xl rounded-xl ${message.fromSelf ? "bg-indigo-500" : "bg-purple-500"}`}>
                    <p className="text-gray-300">{message.message}</p>
                    <span className="text-gray-300 text-sm block">{moment(message.timestamp).format("hh:mm A")}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </div>
      )}
    </>
  );
}
