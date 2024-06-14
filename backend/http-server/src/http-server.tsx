import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

 
 
interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
}
let idCount = 2;
const blogs: Blog[] = [
  { id: 1, title: 'First Blog', content: 'This is the first blog post.', image: 'first-blog.jpg', date: '2024-06-11' },
  { id: 2, title: 'Second Blog', content: 'This is the second blog post.', image: 'second-blog.jpg', date: '2024-06-11' },
];


// Serve static files from the React app
//app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(cors());
app.use(express.json());
// Example API endpoint for blogs
app.get('/api/blogs', (req: Request, res: Response) => {
  res.json(blogs);
});

app.put('/api/blogs/:id', async (req:Request, res:Response)=>{
  const {id} = req.params;
  const {title, content, image} = req.body;
  try {
    // const updatedBlog = await Blog.findByIdAndUpdate(
    //   id,
    //   { title, content, image },
    //   { new: true }
    // );

  
    const updatedBlog = {
      id: Number(id),  // Corrected the id property
      title: title,
      content: content,
      image: image,
      date: '2024-06-11'  // Corrected the date property
    };

    blogs.forEach((blog, index) => {
      if (blog.id === Number(id)) {
        blogs[index] = updatedBlog;
      }
    });

    if (!updatedBlog) {
      return res.status(404).send({ message: 'Blog post not found' });
    }

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send({ message: 'Error updating blog post', error });
  }

})

app.post('/api/blogs', async (req:Request, res:Response)=>{

  console.log(req.body)
  const {title, content, image} = req.body;

    console.log("reached post here")
  try
  {
    const newBlog: Blog = {
      id: blogs.length + 1,
      ...req.body,
      date: new Date().toISOString().split('T')[0], // Add date here if it's not part of req.body
    };
    blogs.push(newBlog);
    res.status(201).json(newBlog);
    } catch (error) {
    res.status(500).send({ message: 'Error updating blog post', error });
    }
    
});

// Example API endpoint for top stocks
app.get('/api/top-stocks', (req: Request, res: Response) => {
  // Example top stocks data
  const topStocks = [
    { symbol: 'AAPL', price: 150.00 },
    { symbol: 'GOOGL', price: 2800.00 },
    { symbol: 'AMZN', price: 3400.00 },
  ];
  res.json(topStocks);
});


// Catch-all handler to serve the React app for any other routes
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`HTTP Server is running on port ${PORT}`);
});
