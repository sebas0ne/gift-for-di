// src/components/effects/EffectMessage.jsx
import React from 'react';
import '../../styles/effects/EffectMessage.css';

const EffectMessage = ({ message }) => {
  return (
    <div className="effectMessage">
      {message}
    </div>
  );
};

export default EffectMessage;
