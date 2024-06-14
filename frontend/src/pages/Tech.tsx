// src/pages/Tech.js
import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

const Tech = () => {

  const [blogs, setBlogs] = useState<Blog[]>([]);

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



    const handleSave = (updatedBlog: Blog) => {
      setBlogs(blogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog)));
    };

  return (
    <div className="pt-20 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Tech Page</h1>
      <h2 className="bg-slate-900 w-1/6 text-white text-center py-2 px-4 rounded hover:bg-slate-700">Add new blog</h2>
      <p className="text-center mb-10">Welcome to my Tech page. Here you will find my blog posts and projects related to technology.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} onSave={handleSave} />
        ))}
      </div>   
  </div>
  );
};

export default Tech;
