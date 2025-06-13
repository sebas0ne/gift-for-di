// src/components/common/CircularTextLoader.jsx
import React from 'react';
import CircularText from "../../components/animations/CircularText";
import CONSTANT from '../../utils/constant';
import '../../styles/common/circularTextLoader.css';

function CircularTextLoader() {
  return (
    <div className="loaderContainer">
      <CircularText
        text={CONSTANT.loaderText}
        onHover="pause"
        spinDuration={10}
        className="custom-class"
      />
    </div>
  );
}

export default CircularTextLoader;
