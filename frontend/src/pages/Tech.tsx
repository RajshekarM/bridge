import { useEffect, useState } from 'react';



interface Blog {
  id?: number; // Optional id for new blogs that haven't been saved yet
  title: string;
  content: string;
  image?: string; // Assuming image might be optional
  date?: string; // Optional for new blogs
}

const Tech = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newBlog, setNewBlog] = useState<Blog>({ title: '', content: '', image: '' });
  const [showForm, setShowForm] = useState(false);

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
  }, []);

  const handleAddBlogClick = () => {
    setShowForm(!showForm);
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBlog),
    })
      .then((response) => response.json())
      .then((data) => {
        setBlogs((prevBlogs) => [...prevBlogs, data]);
        setShowForm(false); // Hide form after submission
        setNewBlog({ title: '', content: '', image: '' }); // Reset form
      })
      .catch((error) => console.error('Error adding blog:', error));
  };

  return (
    <div className="pt-20 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Tech Page</h1>
      <button
        className="bg-slate-900 w-1/6 text-white text-center py-2 px-4 rounded hover:bg-slate-700 mb-4"
        onClick={handleAddBlogClick}
      >
        {showForm ? 'Cancel' : 'Add New Blog'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea
              name="content"
              value={newBlog.content}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              value={newBlog.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Blog
          </button>
        </form>
      )}
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
