// src/pages/AddBlog.js
import { useState } from 'react';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
      image,
      date: new Date().toISOString().split('T')[0],
    };

    fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBlog),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Blog added:', data);
        // Optionally redirect to another page or show a success message
      })
      .catch((error) => console.error('Error adding blog:', error));
  };

  return (
    <div className="pt-20 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Add New Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
