import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/UserAuthContext";
import { ChatContext } from "../context/ChatAuth";
import { db } from "../Firebase-Config";

const ChatUsers = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  /* A hook that is used to fetch data from firebase. */
  useEffect(() => {
    const getState = () => {
      const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unSub();
      };
    };
    currentUser.uid && getState();
  }, [currentUser.uid]);

  /**
   * When the user clicks on a user, dispatch an action to change the user.
   */
  const handleSelect = (info) => {
    dispatch({ type: "CHANGE_USER", payload: info });
  };

  return (
    <div className="chatUser">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className="Users-wrapper"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <div className="users-avatar">
              <img src={chat[1].userInfo.photoURL} alt="Users-avatar" />
            </div>
            <div className="details">
              <h3>{chat[1].userInfo.displayName}</h3>
              <p>{chat[1].lastMessage?.text} </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatUsers;
