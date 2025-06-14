// src/components/effects/EffectMessage.jsx
import React from 'react';
import '../../styles/effects/EffectMessage.css';

const EffectMessage = ({ message, nameClass}) => {
  return (
    <div className={`effectMessage ${nameClass ? 'messageHidden' : ''}`}>
      {message}
    </div>
  );
};

export default EffectMessage;
