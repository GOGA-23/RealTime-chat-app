import React from "react";
import SideBar from "../Components/SideBar";
import Chats from "../Components/Chats";

const Home = () => {
  return (
    <div className="chatContainer">
      <div className="chatWrapper">
        <SideBar />
        <Chats />
      </div>
    </div>
  );
};

export default Home;
