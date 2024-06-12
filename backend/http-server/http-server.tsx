import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// Example API endpoint for blogs
app.get('/api/blogs', (req: Request, res: Response) => {
  // Example blog data
  const blogs = [
    { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
    { id: 2, title: 'Second Blog', content: 'This is the second blog post.' },
  ];
  res.json(blogs);
});

// Catch-all handler to serve the React app for any other routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`HTTP Server is running on port ${PORT}`);
});
