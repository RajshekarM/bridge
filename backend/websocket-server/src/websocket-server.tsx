import WebSocket, { Server } from 'ws';

const PORT = 8080;

const wss = new Server({ port: PORT });

wss.on('connection', (ws: WebSocket) => {
  console.log('WebSocket connection established');

  // Send market data to the client at intervals
  const interval = setInterval(() => {
    const marketData = {
      timestamp: new Date(),
      price: (Math.random() * 1000).toFixed(2), // Example market data
    };
    ws.send(JSON.stringify(marketData));
  }, 1000);

  ws.on('message', (message: string) => {
    console.log('Received:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    clearInterval(interval);
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

console.log(`WebSocket Server is running on port ${PORT}`);
