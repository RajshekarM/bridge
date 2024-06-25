// WebSocketProvider.tsx
import React, { useEffect, useState, ReactNode } from 'react';
import { WebSocketContext } from '../services/WebSocketContext'; 


interface WebSocketProviderProps {
    children: ReactNode;
}


export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
    const [data, setData] = useState<{ [symbol: string]: number }>({});

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080'); 

        ws.onopen = () => {
            console.log('WebSocket connection opened');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setData((prevData) => ({
                ...prevData,
                [message.symbol]: message.price,
            }));
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={data}>
            {children}
        </WebSocketContext.Provider>
    );
};
