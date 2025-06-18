// src/pages/Movies.jsx
import React, { useState } from 'react';
import AnimatedLayout from '../layouts/AnimatedLayout'
import PageTitle from '../components/common/PageTitle';
import AnimatedMenu from '../components/animations/AnimatedMenu';
import AnimatedList from '../components/animations/AnimatedList';
import PolaroidMovies from '../components/common/PolaroidMovies';

import CONSTANT from '../utils/constant';
import '../styles/Pages/Movies.css'

function Movies() {
  const [showPolaroid, setShowPolaroid] = useState(false);
  const [showPolaroidMovie, setShowPolaroidMovie] = useState(null);

  const handleShowPolaroid = (index) => {
    setShowPolaroidMovie(index);
    setShowPolaroid(true);
  };

  const handleOnClosePolaroid = () => {
    setShowPolaroid(false);
  }

  return (
    <AnimatedLayout>
      <div className="moviesContainer">
        <PageTitle
          text={CONSTANT.pageTitleMovies}
          size="3rem"
          weight="800"
        />
        <AnimatedList
          items={CONSTANT.movies}
          onItemSelect={(item) => handleShowPolaroid(item)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
         {showPolaroidMovie && ( <PolaroidMovies isVisible={showPolaroid} imagesData={showPolaroidMovie} onClose={handleOnClosePolaroid} />) }
        <AnimatedMenu />
      </div>
    </AnimatedLayout>
  );
}

export default Movies;
