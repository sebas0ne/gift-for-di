// src/components/animations/BackgroundAnimation.jsx
import '../../styles/animations/BackgroundAnimation.css';

const BackgroundAnimation = () => {
  return (
    <div className="backgroundAnimation">
    {Array.from({ length: 9 }).map((_, i) => (
      <span key={i} className="floatingDot"></span>
    ))}
  </div>
  );
};

export default BackgroundAnimation;
