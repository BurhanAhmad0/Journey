import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GuestMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-7">
      <ul className="text-sm flex items-center gap-5 font-medium">
        <li>
          <Link>Explore</Link>
        </li>
        <li>
          <Link>Community</Link>
        </li>
        <li>
          <Link>About</Link>
        </li>
      </ul>

      <button
        onClick={() => navigate("/register")}
        className="rounded-md bg-amber-500 hover:bg-amber-500/90 px-6 py-2 font-semibold transition-all duration-300 cursor-pointer"
      >
        Get Started
      </button>
    </div>
  );
};

export default GuestMenu;
