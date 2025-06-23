// src/pages/Gift.jsx
import React from 'react';
import PageTitle from '../components/common/PageTitle';
import TicketCard from '../components/common/TicketCard';
import TourGuide from '../components/common/TourGuide';

import CONSTANT from '../utils/constant';
import '../styles/Pages/Movies.css'

function Movies() {

  return (
    <div className="moviesContainer">
      <TourGuide />
      <PageTitle
        text={CONSTANT.gitTitle}
        size="4rem"
        weight="800"
      />
      <TicketCard />
    </div>
  );
}

export default Movies;
