import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatAuth";
import { AuthContext } from "../context/UserAuthContext";
import { db, storage } from "../Firebase-Config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputMessage = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  /* Getting the current user and the data from the Context. */
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text === "") return alert("Please enter the text");
    if (img) {
      try {
        /* Uploading the image to firebase storage. */
        const storageRef = ref(storage, uuidv4());
        await uploadBytesResumable(storageRef, img).then(() => {
          /* Getting the download URL of the image that was uploaded to firebase storage. */
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                uid: uuidv4(),
                text,
                img: downloadURL,
                senderId: currentUser.uid,
                createdOn: Timestamp.now(),
              }),
            });
          });
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      /* Updating the document in the database. */
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          uid: uuidv4(),
          text,
          senderId: currentUser.uid,
          createdOn: Timestamp.now(),
        }),
      });
    }

    /* Updating the currentUser document in the database. */
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        createdOn: Timestamp.now(),
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    /* Updating the user document in the database. */
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        createdOn: Timestamp.now(),
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className="inputMessage">
      <input
        style={{ display: "none" }}
        type="file"
        // value={img}
        id="addImage"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <label htmlFor="addImage">
        <span>
          <i className="fa-regular fa-image"></i>
        </span>
      </label>
      <input
        type="text"
        placeholder="Type a Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default InputMessage;
