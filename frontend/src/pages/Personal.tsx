// src/pages/Personal.js
import React from 'react';

import LearningSection from '../components/LearningSection';


const Personal = () => {


  const sections = [
    {
      title: 'Computer Architecture',

      links: [
        {name : 'Computer Arc Essential on Arm',
        url :'https://www.edx.org/learn/computer-architecture/arm-education-computer-architecture-essentials-on-arm',
        },

        {
          name: 'ARM Education - Embedded Systems Essentials with ARM: Getting Started',
          url: 'https://www.edx.org/learn/embedded-systems/arm-education-embedded-systems-essentials-with-arm-getting-started',
        },
        {
          name : 'ARM Practical - Developing embedded prototypes using the Mbed API and an Arm-based development board',
          url : 'https://www.edx.org/learn/embedded-systems/arm-education-embedded-systems-essentials-with-arm-get-practical-with-hardware',
        }
      ],
    },
    {
      title: 'Software Development',
      links: [
        {
          name: 'Software Development Course',
          url: 'https://www.edx.org/learn/embedded-systems/arm-education-embedded-systems-essentials-with-arm-getting-started',
        },
      ],
    },
    {
      title: 'AI Development',
      links: [
        {
          name: 'AI Development Course',
          url: 'https://www.edx.org/learn/embedded-systems/arm-education-embedded-systems-essentials-with-arm-getting-started',
        },
      ],
    },
  ];




  return (
    <div className="pt-20 container mx-auto">
      <div className="pt-2 container mx-auto">
        <h1 className="font-bold text-3xl text-left mb-1">Learning</h1>
        {sections.map((section, index) => (
          <LearningSection key={index} title={section.title} links={section.links} />
        ))}
      </div>
      
      <h1 className="text-3xm font-bold text-right mb-10">Start timer</h1>
      <h2 className="text-3xm font-bold text-right mb-2">Display the timer</h2>
      <h1 className="text-3xl font-bold text-center mb-10">Personal Page</h1>
      <p className="text-center mb-4">Welcome to my Personal page. Here you will find my interests, fitness journey, health tips, and thoughts on living a happy life.</p>
      {/* content related to personal interests here */}
     
    </div>
  );
};

export default Personal;
