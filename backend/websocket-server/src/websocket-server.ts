import WebSocket, { Server } from 'ws';
import {PubSubManager} from './pubsub-Manager'

const PORT = 8080;

const wss = new Server({ port: PORT });

const redis = PubSubManager.getInstance()

wss.on('connection', (ws: WebSocket) => {
  console.log('WebSocket connection established');

  const userId : string = "12345";

  //passing the websocket of the user
  redis.userSubscribe(userId, "APPLE", ws);

  ws.on('message', (message: string) => {
    console.log('Received:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
    redis.userUnSubscribe(userId, "APPLE")
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

console.log(`WebSocket Server is running on port ${PORT}`);
