
import { useState } from "react"
import HeartRating from "./HeartRating"
import FavoriteButton from "./FavoriteButton"

function MenuCard({ item, isFavorite, onRatingChange, onFavoriteToggle }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <article className="menuCard">
      <div className="cardImageContainer">
      {isLoading && <div className="polaroidLoader"></div>}

        <img
          src={item.image}
          alt={item.name}
          className={`cardImage ${isLoading ? "hidden" : ""}`}
          onLoad={() => setIsLoading(false)}
        />
        <FavoriteButton isFavorite={isFavorite} onClick={() => onFavoriteToggle(item.id)} />
      </div>

      <div className="cardContentMenu">
        <div className="cardHeader">
          <h4 className="cardTitleMenu">{item.name}</h4>
          <span className="cardCategory">{item.category}</span>
        </div>

        <p className="cardStory">{item.story}</p>

        <div className="cardFooter">
          <HeartRating rating={item.rating} onRatingChange={(newRating) => onRatingChange(item.id, newRating)} />
        </div>
      </div>
    </article>
  )
}

export default MenuCard
