"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const PORT = 8080;
const wss = new ws_1.Server({ port: PORT });
wss.on('connection', (ws) => {
    console.log('WebSocket connection established');
    // Send market data to the client at intervals
    const interval = setInterval(() => {
        const marketData = {
            timestamp: new Date(),
            price: (Math.random() * 1000).toFixed(2), // Example market data
        };
        ws.send(JSON.stringify(marketData));
    }, 1000);
    ws.on('message', (message) => {
        console.log('Received:', message);
    });
    ws.on('close', () => {
        console.log('WebSocket connection closed');
        clearInterval(interval);
    });
    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
console.log(`WebSocket Server is running on port ${PORT}`);
