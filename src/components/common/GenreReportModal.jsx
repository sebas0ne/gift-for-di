// src/components/common/GenreReportModal.jsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import CONSTANT from '../../utils/constant';
import '../../styles/common/GenreReportModal.css';

const GenreReportModal = ({ onClose }) => {
  const [report, setReport] = useState({});

  useEffect(() => {
    const dataPerGenre = {};

    CONSTANT.movies.forEach(movie => {
      const key = `rating-${movie.title}`;
      const score = parseFloat(localStorage.getItem(key));
      if (!score) return;

      movie.movie_genres.forEach(genre => {
        if (!dataPerGenre[genre]) dataPerGenre[genre] = [];
        dataPerGenre[genre].push({ title: movie.title, score });
      });
    });

    const calculated = {};
    for (const genre in dataPerGenre) {
      calculated[genre] = dataPerGenre[genre]
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
    }

    setReport(calculated);
  }, []);

  const flatName = (name) => {
    return name.replace(/^\d+\.\s*/, '');
  }

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <header className="modalHeader">
          <h2 className="modalTitle">TOP 5 POR GENERO</h2>
          <button className="modalCloseButton" onClick={onClose} aria-label="Cerrar modal">
            <X size={24} />
          </button>
        </header>

        <div className="modalContent">
          <section className="reportSection">

            {Object.keys(report).length === 0 && (
              <div className="emptyReport">
                <p>No hay puntuaciones registradas aún.</p>
              </div>
            )}

            {Object.entries(report).map(([genre, list]) => (
              <div key={genre} className="categoryReport">
                <h4 className="categoryReportTitle">{genre}</h4>
                <div className="rankingList">
                  {list.map((item, index) => (
                    <div key={item.title} className="rankingItem">
                      <span className="rankingPosition">{index + 1}</span>
                      <div className="rankingInfo">
                        <span className="rankingName">{flatName(item.title)}</span>
                        <div className="rankingStars">
                          {Array.from({ length: Math.floor(item.score) }).map((_, i) => (
                            <span key={i} className="rankingStar">★</span>
                          ))}
                          {item.score % 1 >= 0.5 && (
                            <span className="rankingStar half">★</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default GenreReportModal;
