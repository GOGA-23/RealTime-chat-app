import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatAuth";
import { AuthContext } from "../context/UserAuthContext";

const Message = ({ message }) => {
  const ref = useRef();
  /* Destructuring the currentUser and data from the context. */
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    /* Scrolling the message into view. */
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  return (
    <div
      ref={ref}
      className={`userMessage  ${
        message.senderId === currentUser.uid && "OthersMessage"
      } `}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="User-info"
        />
        <p>{new Date(message?.createdOn?.toDate()).toUTCString()}</p>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="sharePic" />}
      </div>
    </div>
  );
};

export default Message;
