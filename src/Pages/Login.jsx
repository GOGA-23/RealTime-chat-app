import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase-Config";
import Logo from "../images/logo.png";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  /**
   * When the user submits the form, prevent the default action, grab the email and password from the
   * form, and then try to sign in with the email and password. If it works, navigate to the home page.
   * If it doesn't, log the error and set the error state to true.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };
  return (
    <div className="container">
      <div className="wrapper">
        <img src={Logo} alt="Logo" />
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Email" />
          <input type="password" placeholder="Enter Password" />
          <button>Login</button>
          {err && <span>Something Went Wrong</span>}
        </form>
        <p>
          You don't have an account?<Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
