import React from "react";
import DownArrowIcon from "../assets/icons/down-chevron.png";
import Close from "../assets/icons/xButton.png";

function ChatHeader({
  leftIcon,
  title,
  openChat,
  setUsersChatOpen,
  clostChat,
  from,
}) {
  return (
    <div className="chats__heading" onClick={() => setUsersChatOpen()}>
      <div className="heading">
        <img
          src={leftIcon}
          alt="chats"
          className={`chatbox__icons ${
            from === "selectedChat" ? "big__img" : ""
          }`}
        />
        <p>{title.length > 12 ? title.substring(0, 12) + "..." : title}</p>
      </div>
      <div className="actions__container">
        <img
          src={DownArrowIcon}
          alt="chats"
          className={`chatbox__icons ${!openChat ? "reverse__arrow" : ""}`}
        />
        {from === "selectedChat" && (
          <img
            src={Close}
            alt="chats"
            className={`chatbox__icons close__icon`}
            onClick={() => clostChat()}
          />
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
