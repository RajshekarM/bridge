"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Serve static files from the React app
//app.use(express.static(path.join(__dirname, '../../client/build')));
app.use((0, cors_1.default)());
// Example API endpoint for blogs
app.get('/api/blogs', (req, res) => {
    // Example blog data
    const blogs = [
        { id: 1, title: 'First Blog', content: 'This is the first blog post.' },
        { id: 2, title: 'Second Blog', content: 'This is the second blog post.' },
    ];
    res.json(blogs);
});
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
