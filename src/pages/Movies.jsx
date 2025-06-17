// src/pages/Movies.jsx
import React from 'react';
import AnimatedLayout from '../layouts/AnimatedLayout'
import PageTitle from '../components/common/PageTitle';
import AnimatedMenu from '../components/animations/AnimatedMenu';
import AnimatedList from '../components/animations/AnimatedList';

import CONSTANT from '../utils/constant';
import '../styles/Pages/Movies.css'

function Movies() {
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
          onItemSelect={(item, index) => console.log(item, index)}
          showGradients={true}
          enableArrowNavigation={true}
          displayScrollbar={true}
        />
        <AnimatedMenu />
      </div>
    </AnimatedLayout>
  );
}

export default Movies;
