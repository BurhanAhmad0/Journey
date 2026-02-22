import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Api/AuthContext.jsx";
import GuestMenu from "./GuestMenu.jsx";
import ProfielMenu from "./ProfielMenu.jsx";

const Header = () => {
  const { user, loadingUser } = useAuth();

  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState(null);

  useEffect(() => {
    const searchHandle = async () => {
      if (!query) return; // optional: skip empty queries

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/search`,
          {
            params: { q: query }, // query parameter
            withCredentials: true, // if you need cookies/auth
          },
        );

        setSearches(response.data.users);
        // console.log(response.data);
      } catch (error) {
        console.error("Search Error:", error);
      }
    };

    searchHandle();
  }, [query]);

  return (
    <header>
      <nav className="border border-b border-black bg-gray-300/50 flex items-center justify-between px-20 py-3">
        <h2 className="text-3xl font-bold tracking-tight">
          <Link to={!user ? "/login" : `/${user?.username}`}>Journey</Link>
        </h2>

        {loadingUser ? (
          "Loading..."
        ) : !user ? (
          <GuestMenu />
        ) : (
          <ProfielMenu
            query={query}
            setQuery={setQuery}
            setSearches={setSearches}
            searches={searches}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;
