// src/pages/Timeline.jsx
import React from 'react';
import PageTitle from '../components/common/PageTitle';
import TimelineContent from '../components/common/TimelineContent';

import CONSTANT from '../utils/constant';

function Timeline() {

  return (
    <div className="moviesContainer">
      <PageTitle
        text={CONSTANT.timeLinePage}
        size="4rem"
        weight="800"
      />
      <TimelineContent items={CONSTANT.timelineData} />
    </div>
  );
}

export default Timeline;
