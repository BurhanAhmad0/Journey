import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CircleUser, Bell, Mails } from "lucide-react";
import SearchComponent from "./SearchComponent.jsx";
import { useAuth } from "../Api/AuthContext.jsx";

const ProfielMenu = ({ query, setQuery, setSearches, searches }) => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/auth/logout`,
        {},
        { withCredentials: true },
      );

      setUser(null);

      toast.success("Logged out successfully");

      navigate("/login"); // optional but recommended
    } catch (error) {
      console.error("Logout Error:", error);

      toast.error(error.response?.data?.message || "Unable to log out");
    }
  };

  return (
    <div className="flex items-center gap-5">
      <SearchComponent
        query={query}
        setQuery={setQuery}
        setSearches={setSearches}
        searches={searches}
      />
      <div className="flex items-center gap-3">
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-300 cursor-pointer">
          <Mails size={23} />
        </button>

        <div className="relative group">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-300 cursor-pointer">
            <Bell size={23} />
          </button>

          <ul className="space-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible p-5 absolute right-0 top-13 w-52 h-72 rounded-md bg-yellow-500">
            <li className="border-b border-black pt-2 pb-2">
              <span>Unread Messages</span>
            </li>
          </ul>
        </div>

        <div className="relative group">
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-300 cursor-pointer">
            <CircleUser size={23} />
          </button>
          <ul className="space-y-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible p-5 absolute right-0 top-13 w-52 h-72 rounded-md bg-yellow-500">
            <li>
              <Link
                to={`/${user.username}`}
                className="w-full inline-block px-5 py-2 border-t border-white text-white rounded-md bg-black hover:bg-black/80 font-medium cursor-pointer transition-all duration-300"
              >
                Hi, {user.firstName}
              </Link>
            </li>
            <li>
              <button
                onClick={() => handleLogout()}
                className="w-full px-5 py-2 border-t border-white text-white text-start rounded-md bg-black hover:bg-black/80 font-medium cursor-pointer transition-all duration-300"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfielMenu;
