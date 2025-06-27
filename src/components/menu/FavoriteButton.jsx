"use client"
import { Star } from "lucide-react"

function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      className={`favoriteButton ${isFavorite ? "favoriteActive" : ""}`}
      onClick={onClick}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Star size={15} />
    </button>
  )
}

export default FavoriteButton
