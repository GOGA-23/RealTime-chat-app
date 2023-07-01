import React, { useState } from "react";
import Logo from "../images/logo.png";
import AddIcon from "../images/add-image-icon.jpg";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, storage } from "../Firebase-Config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  /**
   * It creates a user with email and password, creates a unique name for the image, uploads the image
   * to the firebase storage and gets the downloadURL of the image, updates the profile, adds a
   * document to the users collection, adds a document to the userChats collection, and navigates to
   * the login page.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      /* Creating a user with email and password. */
      const res = await createUserWithEmailAndPassword(auth, email, password);

      /* Creating a unique name for the image. */
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      /* Uploading the image to the firebase storage and getting the downloadURL of the image. */
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            /* Update profile */
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            /* Adding a document to the users collection. */
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            /* Adding a document to the userChats collection. */
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");
          } catch (error) {
            setErr(true);
            console.log(error);
          }
        });
      });
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="container">
      <div className="wrapper">
        <img src={Logo} alt="Logo" />
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder=" Username" />
          <input type="text" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />

          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={AddIcon} alt="add-icon" />
            <span>Add Your Profile Picture</span>
          </label>
          <button>Sign up</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>
          You do have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
