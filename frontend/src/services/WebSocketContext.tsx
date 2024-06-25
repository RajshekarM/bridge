
import { createContext } from 'react';

type WebSocketContextType = {
    [symbol: string]: number;
} | null;

export const WebSocketContext = createContext<WebSocketContextType>(null);
