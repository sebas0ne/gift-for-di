// src/pages/About/About.jsx
import React from 'react';
import AnimatedLayout from '../layouts/AnimatedLayout'

function About() {
  return (
    <AnimatedLayout transitionName="portal">
      <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>About Page</h1>
      <p>Esta es la segunda página para probar las transiciones 🎉</p>
    </div>
    </AnimatedLayout>
  );
}

export default About;
