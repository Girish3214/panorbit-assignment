import React, { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import { useGlobalContext } from "../store/UserContext";
import useChatData from "../hooks/useChatData";

import Send from "../assets/icons/send-message.png";

function Chatbox() {
  const {
    setUserChatOpen,
    selectedChatUser,
    openUserChat,
    closeChat,
    selectedUser,
  } = useGlobalContext();
  const { chat, addToChat } = useChatData();

  const messagesEndRef = useRef();

  const [msg, setMsg] = useState("");
  const [chats, setchats] = useState(chat);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMsg(value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (msg) {
      const newChats = [
        ...chats,
        {
          id: chats.length + 1,
          message: msg,
          sender: selectedUser.id,
        },
      ];
      setchats(newChats);
      addToChat(msg, selectedUser.id);
      setMsg("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behaviour: "smooth" });
    return () => {};
  }, [chats]);

  return (
    <div className="chat__container">
      <ChatHeader
        title={selectedChatUser.name}
        leftIcon={selectedChatUser.profilepicture}
        setUsersChatOpen={setUserChatOpen}
        openChat={openUserChat}
        clostChat={closeChat}
        from="selectedChat"
      />

      {openUserChat && (
        <>
          <div className="chats__container messages__container">
            {chats.map((cht, i) => (
              <div
                key={cht.id}
                className={`message ${
                  cht.sender === selectedUser.id
                    ? "self"
                    : i % 2 === 0
                    ? "self"
                    : ""
                }`}
                ref={messagesEndRef}
              >
                <div className="chat__user__details">{cht.message}</div>
              </div>
            ))}
          </div>
          <form className="input__container" onSubmit={(e) => handleSend(e)}>
            <input
              type="text"
              value={msg}
              onChange={(e) => handleInputChange(e)}
            />
            <button type="submit" disabled={!msg}>
              <img src={Send} alt="send" />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Chatbox;
