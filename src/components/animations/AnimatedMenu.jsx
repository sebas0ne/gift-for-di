import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import '../../styles/animations/AnimatedMenu.css';

const itemsMenu = [
  { label: 'HOME', path: '/' },
  { label: 'MOVIES', path: '/movies' }
];

const AnimatedMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    if (e) e.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <div className="containerMenu">
        <div
          className={`menuContainer ${menuOpen ? 'fullMenu' : ''}`}
          id="toggle"
          onClick={toggleMenu}
        >
          <div className="menuButton">
            {menuOpen ? <X size={48} /> : <Menu size={48} />}
          </div>
          <div className="circle"></div>
        </div>
      </div>

      <div className={`overlayContainer ${menuOpen ? 'open' : ''}`}>
        <nav className="overlay-menu">
          <ul>
            {itemsMenu.map((item, index) => (
              <li key={index}>
                <button
                  className="menu-link"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AnimatedMenu;
