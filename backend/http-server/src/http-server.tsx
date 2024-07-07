import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

interface User{
  userId : number;
  name : string;
  balance : number;
}
 interface Order{
  orderId : number;
  userId : number;
  type : "buy" | "sell";
  price : number;
  quantity : number;
  symbol : string;
 }
 
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
  { id: 2, title: 'Understanding Event loop', content: 'Event loop plays an important role in Node Js to handle multiple requests from users.', image: 'second-blog.jpg', date: '2024-06-11' },
  { id: 2, title: 'Improving the Performace or latency of your program', 
    content: 'CPU cache, which should ideally store the frequently accessed data and instructions of the hotpath, is instead being overwritten ("trampled") by data and instructions that are not part of the hotpath. This can happen because modern systems have many processes and data being accessed simultaneously, leading to cache pollution.Keeping the Caches Hot The concept of "keeping the caches hot" involves ensuring that the data and instructions relevant to the hotpath remain in the CPU cache as much as possible. This minimizes cache misses, which occur when the CPU has to fetch data from slower main memory instead of the fast cache.',
    image: 'second-blog.jpg', date: '2024-06-11' },
];

interface orderDetail{
  price : number;
  quantity : number;
}
interface orderBook{
  type : string;
  queue : orderDetail [];
}

const bidsOrderbook: orderBook = {
  type: "bids",
  queue: []
};

bidsOrderbook.queue.push({price:100, quantity : 20})
bidsOrderbook.queue.push({price:101, quantity : 25})




const askOrderbook: orderBook = {
  type: "ask",
  queue: []
};

askOrderbook.queue.push({price:100, quantity : 20});
askOrderbook.queue.push({price:101, quantity:202});




const processOrder = (order:Order, askOrderbook:orderBook) => {
  let { type, quantity, price } = order;

  if (type === "buy") {
    const asksQueue = askOrderbook.queue;

    // Using a while loop to handle the case where quantity is reduced within the loop
    let i = 0;
    while (i < asksQueue.length && quantity > 0) {
      if (price >= asksQueue[i].price) {
        if (quantity >= asksQueue[i].quantity) {
          // Fully match the ask order
          quantity -= asksQueue[i].quantity;
          asksQueue.splice(i, 1); // Remove the matched ask order
        } else {
          // Partially match the ask order
          asksQueue[i].quantity -= quantity;
          quantity = 0; // The buy order is fully matched
        }
      } else {
        // Move to the next ask order
        i++;
      }
    }

    // If there is any remaining quantity, it would stay in the buy order book
    if (quantity > 0) {
      // Add the remaining buy order back to the buy order book
      console.log(`Remaining quantity: ${quantity} to be added back to the buy order book`);
      // Add your logic here to add the remaining buy order back to the buy order book
    }
  } else {
    // Logic for handling sell orders
    // Similar logic can be implemented here for sell orders
  }
};


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






app.post("/placeorder",(req:Request, res : Response<Order>)=>{
  const response = res.data.stringify();
  const order =  response;
  const orderStatus:any = processOrder(order);
  res.send(orderStatus);

})


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
