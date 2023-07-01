import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatAuth";
import { db } from "../Firebase-Config";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessage] = useState([]);
  const { data } = useContext(ChatContext);

  /* A hook that is listening to the database for changes. */
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessage(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="message">
      {messages.map((msg) => (
        <Message message={msg} key={msg.uid} />
      ))}
    </div>
  );
};

export default Messages;
