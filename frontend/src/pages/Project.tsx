import React, { useState } from 'react';

// Define types for projects
type ProjectType = 'mobile' | 'web' | 'ai';

interface Project {
  id: number;
  title: string;
  description: string;
}

const Project: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<ProjectType>('mobile'); // Default tab

  const handleTabChange = (tab: ProjectType) => {
    setSelectedTab(tab);
  };

  // Mock data for projects
  const mobileProjects: Project[] = [
    { id: 1, title: 'Mobile Project 1', description: 'Description for Mobile Project 1' },
    { id: 2, title: 'Mobile Project 2', description: 'Description for Mobile Project 2' },
  ];

  const webProjects: Project[] = [
    { id: 3, title: 'Web Project 1', description: 'Description for Web Project 1' },
    { id: 4, title: 'Web Project 2', description: 'Description for Web Project 2' },
  ];

  const aiProjects: Project[] = [
    { id: 5, title: 'AI Project 1', description: 'Description for AI Project 1' },
    { id: 6, title: 'AI Project 2', description: 'Description for AI Project 2' },
  ];

  // Function to render projects based on selected tab
  const renderProjects = () => {
    switch (selectedTab) {
      case 'mobile':
        return mobileProjects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ));
      case 'web':
        return webProjects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ));
      case 'ai':
        return aiProjects.map((project) => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="pt-20 container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">Projects Page</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => handleTabChange('mobile')}
          className={`${
            selectedTab === 'mobile' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          } py-2 px-4 mx-2 rounded`}
        >
          Mobile Apps
        </button>
        <button
          onClick={() => handleTabChange('web')}
          className={`${
            selectedTab === 'web' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          } py-2 px-4 mx-2 rounded`}
        >
          Web Apps
        </button>
        <button
          onClick={() => handleTabChange('ai')}
          className={`${
            selectedTab === 'ai' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          } py-2 px-4 mx-2 rounded`}
        >
          AI Projects
        </button>
      </div>

      {/* Render projects based on selected tab */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {renderProjects()}
      </div>
    </div>
  );
};

export default Project;
