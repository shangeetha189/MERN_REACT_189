import React from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import BookIcon from "@mui/icons-material/Book";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="Nav-container">

      <div className="nav-left">

        <Link to="/home" className="logo">
          <BookIcon />
          <h1>Notes</h1>
        </Link>

        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>

          <li>
            <Link to="/favs">Favs</Link>
          </li>
        </ul>

      </div>

      <div className="nav-right">

        <div className="search-box">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search notes..."
          />
        </div>

        <button
          className="nav-button"
          onClick={handleLogout}
        >
          <LogoutIcon />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;