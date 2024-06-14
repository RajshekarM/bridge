"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const blogs = [
    { id: 1, title: 'First Blog', content: 'This is the first blog post.', image: 'first-blog.jpg', date: '2024-06-11' },
    { id: 2, title: 'Second Blog', content: 'This is the second blog post.', image: 'second-blog.jpg', date: '2024-06-11' },
];
// Serve static files from the React app
//app.use(express.static(path.join(__dirname, '../../client/build')));
app.use((0, cors_1.default)());
// Example API endpoint for blogs
app.get('/api/blogs', (req, res) => {
    // Example blog data
    res.json(blogs);
});
app.put('/api/blogs/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, image } = req.body;
    try {
        // const updatedBlog = await Blog.findByIdAndUpdate(
        //   id,
        //   { title, content, image },
        //   { new: true }
        // );
        const updatedBlog = blogs.push({
            id: Number(id), // Corrected the id property
            title: title,
            content: content,
            image: image,
            date: '2024-06-11' // Corrected the date property
        });
        if (!updatedBlog) {
            return res.status(404).send({ message: 'Blog post not found' });
        }
        res.status(200).send(blogs);
    }
    catch (error) {
        res.status(500).send({ message: 'Error updating blog post', error });
    }
}));
// Example API endpoint for top stocks
app.get('/api/top-stocks', (req, res) => {
    // Example top stocks data
    const topStocks = [
        { symbol: 'AAPL', price: 150.00 },
        { symbol: 'GOOGL', price: 2800.00 },
        { symbol: 'AMZN', price: 3400.00 },
    ];
    res.json(topStocks);
});
// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/build', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`HTTP Server is running on port ${PORT}`);
});
