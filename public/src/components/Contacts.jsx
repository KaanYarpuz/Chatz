import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutRoute } from "../utils/APIRoutes";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
    };
    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleLogout = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="h-full grid grid-rows-[10%,75%,15%] overflow-hidden bg-gray-800 border-r border-gray">
      <div className="flex items-center gap-4 justify-center">
        <h3 className="text-white uppercase">Chatz</h3>
      </div>
      <div className="flex flex-col items-center overflow-auto gap-2">
        {contacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`contact bg-gray-600 min-h-20 cursor-pointer w-11/12 rounded-md p-2 flex gap-4 items-center transition ease-in-out duration-500 ${
              index === currentSelected ? "bg-purple-500" : ""
            }`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar"></div>
            <div className="username">
              <h3 className="text-white">{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="current-user flex justify-center items-center gap-8 border-t border-gray pt-2">
        <div className="avatar">
          {/* Add the avatar image if available */}
        </div>
        <div className="username">
          <h2 className="text-white">{currentUserName}</h2>
        </div>
        <button
          onClick={handleLogout}
          className="text-white bg-purple1 p-2 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
