// src/pages/Gift.jsx
import React from 'react';
import AnimatedLayout from '../layouts/AnimatedLayout'
import PageTitle from '../components/common/PageTitle';
import Menu from '../components/animations/Menu';
import TicketCard from '../components/common/TicketCard';
import TourGuide from '../components/common/TourGuide';

import CONSTANT from '../utils/constant';
import '../styles/Pages/Movies.css'

function Movies() {

  return (
    <AnimatedLayout>
      <div className="moviesContainer">
      <TourGuide />
        <PageTitle
          text={CONSTANT.gitTitle}
          size="4rem"
          weight="800"
        />
        <TicketCard />
        <Menu />
      </div>
    </AnimatedLayout>
  );
}

export default Movies;
