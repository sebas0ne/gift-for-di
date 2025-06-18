// src/components/animations/Menu.jsx
import React, { useState } from "react";
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import CONSTANT from '../../utils/constant';
import '../../styles/animations/Menu.css';

const MenuM = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleNavigate = (path) => {
    setIsOpen(false);
    setTimeout(() => navigate(path), 400);
  };

  return (
    <div className="menu-content">
      <div
        className={`menu-icon ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        {isOpen ? <X size={40} /> : <Menu size={40} />}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overlay-menu"
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {CONSTANT.itemsMenu.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.li
                    key={item.path}
                    className={isActive ? "active" : ""}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.label}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuM;
