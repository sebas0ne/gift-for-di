import React from 'react';
import '../../styles/common/PageTitle.css';

const PageTitle = ({ text, size = '2rem', weight = '700', color = 'var(--color-black)' }) => {
  return (
    <span
      className="pageTitle"
      style={{
        fontSize: size,
        fontWeight: weight,
        color: color,
      }}
    >
      {text}
    </span>
  );
};

export default PageTitle;
