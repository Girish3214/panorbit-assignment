import React, { useState } from "react";
import "../assets/styles/chat.css";
import { useGlobalContext } from "../store/UserContext";

import ChatIcon from "../assets/icons/message.png";
import ChatHeader from "./ChatHeader";

function Userbox() {
  const {
    usersData,
    openChat,
    setUsersChatOpen,
    setSelectedChatUserDetails,
    selectedUser,
  } = useGlobalContext();

  const handleSelectUserToChat = (userToChat) => {
    setSelectedChatUserDetails(userToChat);
  };
  return (
    <div className="chat__users__container">
      <ChatHeader
        title={"Chats"}
        leftIcon={ChatIcon}
        setUsersChatOpen={() => setUsersChatOpen()}
        openChat={openChat}
      />

      {openChat && (
        <div className="chats__container">
          {usersData.map(
            (user) =>
              selectedUser.id !== user.id && (
                <div
                  key={user.id}
                  className="chat__user__item"
                  onClick={() => handleSelectUserToChat(user)}
                >
                  <div className="chat__user__details">
                    <img src={user.profilepicture} alt={user.name} />
                    <p className="">{user.name}</p>
                  </div>
                  <div className="chat__user__status">
                    <div
                      className={`status ${
                        user.id % 3 === 0 ? "offline" : "online"
                      }`}
                    ></div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default Userbox;
