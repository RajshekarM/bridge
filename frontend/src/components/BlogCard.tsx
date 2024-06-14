import React, { useState } from 'react';

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}

interface BlogCardProps {
  blog: Blog;
  onSave: (updatedBlog: Blog) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState<Blog>(blog);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    fetch(`http://localhost:5000/api/blogs/${blog.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBlog),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        onSave(data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error saving blog:', error));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {isEditing ? (
        <div className="p-4">
          <input
            type="text"
            className="w-full mb-2 p-2 border rounded"
            value={editedBlog.title}
            onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            value={editedBlog.content}
            onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
          />
          <input
            type="text"
            className="w-full mb-2 p-2 border rounded"
            value={editedBlog.image}
            onChange={(e) => setEditedBlog({ ...editedBlog, image: e.target.value })}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <>
          <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 mb-4">{blog.content}</p>
            <p className="text-gray-400 text-sm">{blog.date}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={handleEditClick}>
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogCard;
