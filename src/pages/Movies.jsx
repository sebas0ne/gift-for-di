// src/pages/Movies.jsx
import React, { useState } from 'react';
import { FileText } from "lucide-react"
import PageTitle from '../components/common/PageTitle';
import AnimatedList from '../components/animations/AnimatedList';
import PolaroidMovies from '../components/common/PolaroidMovies';
import GenreReportModal from '../components/common/GenreReportModal';
import PlayPauseButton from "../components/menu/PlayPauseButton";

import CONSTANT from '../utils/constant';
import '../styles/Pages/Movies.css'

function Movies() {
  const [showPolaroid, setShowPolaroid] = useState(false);
  const [showPolaroidMovie, setShowPolaroidMovie] = useState(null);
  const [showReport, setShowReport] = useState(false);

  const handleShowPolaroid = (index) => {
    setShowPolaroidMovie(index);
    setShowPolaroid(true);
  };

  const handleOnClosePolaroid = () => {
    setShowPolaroid(false);
  }

  return (
      <div className="moviesContainer">
        <PageTitle
          text={CONSTANT.pageTitleMovies}
          size="3rem"
          weight="800"
        />
      <button className="reportButtonMovies" onClick={() => setShowReport(true)}>
        <FileText size={20} />
      </button>
      <PlayPauseButton musicPath={CONSTANT.musicPath.movies} />

      {showReport && <GenreReportModal onClose={() => setShowReport(false)} />}
        <AnimatedList
          items={CONSTANT.movies}
          onItemSelect={(item) => handleShowPolaroid(item)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
         {showPolaroidMovie && ( <PolaroidMovies isVisible={showPolaroid} imagesData={showPolaroidMovie} onClose={handleOnClosePolaroid} />) }
      </div>
  );
}

export default Movies;
