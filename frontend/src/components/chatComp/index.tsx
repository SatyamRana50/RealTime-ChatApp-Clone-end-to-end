import React, { useEffect, useMemo } from "react";
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatInputBox from "./ChatInputBox";
// import { useGetMessages } from "../../hooks/useGetMessages";
import { Message } from "../../data";
import { io } from "socket.io-client";

const Chat = () => {
  /** Simulate a hook fetching the data */
  const socket = useMemo(() => io("http://localhost:3000"),[]);
  /** State to control new messages */
  const [chatMessages, setChatMessages] = React.useState<Message[]>([]);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    } );
    socket.on("response", (message: Message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.disconnect();
      socket.off("response");
    };
  } , [socket]);

  /**
   *
   * @param message
   * "Create" a new message
   */
  const sendANewMessage = (message: Message) => {
    socket.emit("message", message);
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  /**
   * Reset chat to the default messages
   */
  // const resetChat = () => {
  //   setChatMessages(data);
  // };

  return (
    // <div className="w-96 mx-4  my-4">
    //   <div className="bg-white border border-gray-200 rounded-lg shadow relative">
    //     <ChatHeader name={"devlazar"} numberOfMessages={chatMessages.length} />
    //       <ChatContent messages={chatMessages} />
    //     <ChatInputBox sendANewMessage={sendANewMessage} />
    //   </div>
    // </div>
    <div className="flex flex-col h-full w-full">
      <div className="h-1/10 bg-slate-200">
        <ChatHeader name={"devlazar"} numberOfMessages={chatMessages.length} />
      </div>

        <ChatContent messages={chatMessages} />

      <div className="bg-gray-400 h-1/10">
        <ChatInputBox sendANewMessage={sendANewMessage} />
      </div>
    </div>
  )
};

export default Chat;
