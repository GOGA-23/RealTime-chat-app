import React, { useContext } from "react";
import Messages from "../Components/Messages";
import InputMessage from "../Components/InputMessage";
import { ChatContext } from "../context/ChatAuth";

const Chats = () => {
  /* Destructuring the data from the ChatContext. */
  const { data } = useContext(ChatContext);

  return (
    <div className="Chats">
      <div className="chatInfo">
        <div className="user-detail">
          <img src={data.user?.photoURL} alt="User-pic" />
          <div className="details">
            <h3>{data.user?.displayName}</h3>
          </div>
        </div>
        <div>
          <span>
            <i className="fa-solid fa-user-plus"></i>
          </span>
          <span>
            <i className="fa-solid fa-video"></i>
          </span>
          <span>
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </span>
        </div>
      </div>
      <Messages />
      <InputMessage />
    </div>
  );
};

export default Chats;
