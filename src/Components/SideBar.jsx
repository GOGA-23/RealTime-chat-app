import React from "react";
import Navbar from "../Components/Navbar";
import Search from "../Components/Search";
import ChatUsers from "../Components/ChatUsers";

const SideBar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <ChatUsers />
    </div>
  );
};

export default SideBar;
