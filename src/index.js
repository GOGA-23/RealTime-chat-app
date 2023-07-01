import React from "react";
import ReactDOM from "react-dom/client";
import "./sass/style.scss";
import App from "./App";
// import "dotenv/config";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { ChatContextProvider } from "./context/ChatAuth";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatContextProvider>
    </UserAuthContextProvider>
  </React.StrictMode>
);
