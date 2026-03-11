import React from 'react';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Portfolio from '../sections/Portfolio';
import Contact from '../sections/Contact';

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      <Contact />
    </div>
  );
};

export default Home;
