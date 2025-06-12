// src/components/common/CircularTextLoader.jsx
import React from 'react';
import CircularText from "../../components/animations/CircularText";
import '../../styles/common/circularTextLoader.css';

function CircularTextLoader() {
  const text = '* MI AMOR * FELIZ CUMPLEAÑOS * ';

  return (
    <div className="loaderContainer">
      <CircularText
        text={text}
        onHover="pause"
        spinDuration={10}
        className="custom-class"
      />
    </div>
  );
}

export default CircularTextLoader;
