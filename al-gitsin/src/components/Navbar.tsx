import { Link } from "react-router-dom";
import React from "react";
import logo from "/src/assets/icon.jpg";

interface NavbarProps {
  onSearch: (query: string) => void;
}


const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="AlGitsin Logo" className="navbar-logo" />
          <span className="brand-name">AlGitsin</span>
        </Link>

        <input
          type="text"
          placeholder="Ara..."
          className="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="navbar-links">
        <Link to="/">Anasayfa</Link>
        <Link to="/favorites">Favoriler</Link>
        <Link to="/cart">Sepet</Link>
        <Link to="/account">Hesabım</Link>
      </div>
    </nav>
  );
};

export default Navbar;
