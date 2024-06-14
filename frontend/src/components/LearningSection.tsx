import React from 'react';

interface LearningSectionProps {
  title: string;
  links: { name: string; url: string }[];
}

const LearningSection: React.FC<LearningSectionProps> = ({ title, links }) => {
  return (
    <div className="mb-10">
      <h2 className="font-bold">{title}</h2>
      <ul className="list-disc pl-5">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LearningSection;
