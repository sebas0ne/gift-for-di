"use client"

import { useState, useEffect } from "react"
import { FileText } from "lucide-react"
import MenuCard from "../components/menu/MenuCard";
import PlayPauseButton from "../components/menu/PlayPauseButton";
import ReportModal from "../components/menu/ReportModal";

import CONSTANT from '../utils/constant';
import "../styles/Pages/LoveMenu.css";
import "../styles/menu/buttonsManager.css";


function LoveMenu() {
  const [menuItems, setMenuItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Cargar datos del localStorage
    const savedRatings = JSON.parse(localStorage.getItem(CONSTANT.keysLocalStorage.menuRatings) || "{}")
    const savedFavorites = JSON.parse(localStorage.getItem(CONSTANT.keysLocalStorage.menuFavorites) || "[]")

    const itemsWithRatings = CONSTANT.menuData.map((item) => ({
      ...item,
      rating: savedRatings[item.id] || 0,
    }))

    setMenuItems(itemsWithRatings)
    setFavorites(savedFavorites)
  }, [])

  const handleRatingChange = (itemId, newRating) => {
    const updatedItems = menuItems.map((item) => (item.id === itemId ? { ...item, rating: newRating } : item))
    setMenuItems(updatedItems)

    // Guardar en localStorage
    const ratings = {}
    updatedItems.forEach((item) => {
      if (item.rating > 0) {
        ratings[item.id] = item.rating
      }
    })
    localStorage.setItem(CONSTANT.keysLocalStorage.menuRatings, JSON.stringify(ratings))
  }

  const handleFavoriteToggle = (itemId) => {
    const newFavorites = favorites.includes(itemId) ? favorites.filter((id) => id !== itemId) : [...favorites, itemId]

    setFavorites(newFavorites)
    localStorage.setItem(CONSTANT.keysLocalStorage.menuFavorites, JSON.stringify(newFavorites))
  }

  const categorizedItems = {
    ENTRADAS: menuItems.filter((item) => item.category === "Entradas"),
    PRINCIPAL: menuItems.filter((item) => item.category === "Principal"),
    POSTRES: menuItems.filter((item) => item.category === "Postres"),
    BEBIDAS: menuItems.filter((item) => item.category === "Bebidas"),
  }

  return (
    <div className="loveMenuContainer">
      <PlayPauseButton />

      <button className="reportButton" onClick={() => setIsModalOpen(true)} aria-label="Ver reporte">
        <FileText size={20} />
      </button>

      <main className="mainContent">
        <div className="restaurantHeader">
          <h1 className="restaurantTitle">S&D LA RUTA DEL SABOR</h1>
          <p className="restaurantSubtitle">Cocina del Corazón</p>
          <h2 className="menuTitle">MENÚ</h2>
        </div>

        {Object.entries(categorizedItems).map(([category, items]) => (
          <section key={category} className="menuSection">
            <h3 className="categoryTitle">{category}</h3>
            <div className="menuGrid">
              {items.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  onRatingChange={handleRatingChange}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuItems={menuItems}
        favorites={favorites}
      />
    </div>
  )
}

export default LoveMenu;
