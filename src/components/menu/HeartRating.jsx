"use client"
import { Heart } from "lucide-react"

function HeartRating({ rating, onRatingChange }) {
  const handleHeartClick = (heartIndex) => {
    const newRating = heartIndex + 1
    onRatingChange(newRating === rating ? 0 : newRating)
  }

  return (
    <div className="heartRating">
      <span className="ratingLabel">Cuánto nos derretimos aquí:</span>
      <div className="heartsContainer">
        {[0, 1, 2, 3, 4].map((heartIndex) => (
          <button
            key={heartIndex}
            className={`heartButton ${heartIndex < rating ? "heartFilled" : "heartEmpty"}`}
            onClick={() => handleHeartClick(heartIndex)}
            aria-label={`Calificar con ${heartIndex + 1} corazones`}
          >
            <Heart size={20} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default HeartRating
