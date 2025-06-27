
import { useMemo } from "react"
import { X, Heart, Star } from "lucide-react"

import CONSTANT from '../../utils/constant';

function ReportModal({ isOpen, onClose, menuItems, favorites }) {
  const reportData = useMemo(() => {
    // Obtener lugares mejor puntuados por categoría
    const categorizedRankings = {}
    const categories = CONSTANT.reportModalMenu.categories;

    categories.forEach((category) => {
      const categoryItems = menuItems
        .filter((item) => item.category === category && item.rating > 0)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)

      if (categoryItems.length > 0) {
        categorizedRankings[category] = categoryItems
      }
    })

    // Obtener favoritos por categoría
    const categorizedFavorites = {}
    categories.forEach((category) => {
      const categoryFavorites = menuItems.filter((item) => item.category === category && favorites.includes(item.id))

      if (categoryFavorites.length > 0) {
        categorizedFavorites[category] = categoryFavorites
      }
    })

    return { categorizedRankings, categorizedFavorites }
  }, [menuItems, favorites])

  if (!isOpen) return null

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <header className="modalHeader">
          <h2 className="modalTitle">{CONSTANT.reportModalMenu.headerTitle}</h2>
          <button className="modalCloseButton" onClick={onClose} aria-label="Cerrar modal">
            <X size={24} />
          </button>
        </header>

        <div className="modalContent">
          <section className="reportSection">
            <h3 className="reportSectionTitle">
              {CONSTANT.reportModalMenu.reportSection.Heart}
              <Heart size={20} />
            </h3>

            {Object.entries(reportData.categorizedRankings).map(([category, items]) => (
              <div key={category} className="categoryReport">
                <h4 className="categoryReportTitle">{category}</h4>
                <div className="rankingList">
                  {items.map((item, index) => (
                    <div key={item.id} className="rankingItem">
                      <span className="rankingPosition">{index + 1}</span>
                      <div className="rankingInfo">
                        <span className="rankingName">{item.name}</span>
                        <div className="rankingHearts">
                          {Array.from({ length: item.rating }, (_, i) => (
                            <span key={i} className="rankingHeart">
                              ♥
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="reportSection">
            <h3 className="reportSectionTitle">
              {CONSTANT.reportModalMenu.reportSection.Star}
              <Star size={20} />
            </h3>

            {Object.entries(reportData.categorizedFavorites).map(([category, items]) => (
              <div key={category} className="categoryReport">
                <h4 className="categoryReportTitle">{category}</h4>
                <div className="favoritesList">
                  {items.map((item) => (
                    <div key={item.id} className="favoriteItem">
                      <span className="favoriteName">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {Object.keys(reportData.categorizedRankings).length === 0 &&
            Object.keys(reportData.categorizedFavorites).length === 0 && (
              <div className="emptyReport">
                <p>{CONSTANT.reportModalMenu.emptyReport.text_1}</p>
                <p>{CONSTANT.reportModalMenu.emptyReport.text_2}</p>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default ReportModal
