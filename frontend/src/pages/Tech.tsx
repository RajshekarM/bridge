// src/pages/Tech.js
import { useEffect, useState } from 'react';






const Tech = () => {

  const [blogs, setBlogs] = useState([{}])

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setBlogs(data))
      .catch((error) => console.error('Error fetching blogs:', error));
  
      
    }, []); // Empty dependency array means this effect runs once when the component mounts


  return (
    <div className="pt-20 container mx-auto px-4">
    <h1 className="text-3xl font-bold text-center mb-10">Tech Page</h1>
    <p className="text-center mb-10">Welcome to my Tech page. Here you will find my blog posts and projects related to technology.</p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <p className="text-gray-400 text-sm">{post.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Tech;
