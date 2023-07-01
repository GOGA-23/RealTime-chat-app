import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserAuthContext";
import { auth } from "../Firebase-Config";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  /**
   * When the user clicks the sign out button, the user will be signed out and redirected to the login
   * page.
   */
  const handleClick = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="user-img">
        <img src={currentUser.photoURL} alt="User-pic" />
        {/* <span> */}
        <p>{currentUser.displayName}</p>
        {/* </span> */}
      </div>
      <div className="nav-icons">
        <span>
          <i className="fa-solid fa-users"></i>
        </span>
        <span>
          <i className="fa-regular fa-message"></i>
        </span>
        <button onClick={handleClick}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
