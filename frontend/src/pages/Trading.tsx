import { useEffect, useState } from 'react';

const Trading = () => {
  const [marketData, setMarketData] = useState<{ timestamp: string, price: string } | null>(null);
  const [topStocks, setTopStocks] = useState<{ symbol: string, price: number }[]>([]);
  
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMarketData(data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Fetch top stocks data from an API endpoint
    fetch('/api/top-stocks')
      .then((response) => response.json())
      .then((data) => setTopStocks(data))
      .catch((error) => console.error('Error fetching top stocks:', error));
  }, []);

  return (
    <div className="pt-20 container mx-auto">
      <h1>Trading Page</h1>
      <div>
        <h2>Market Data</h2>
        {marketData ? (
          <div>
            <p>Timestamp: {marketData.timestamp}</p>
            <p>Price: {marketData.price}</p>
          </div>
        ) : (
          <p>Loading market data...</p>
        )}
      </div>
      <div>
        <h2>Top Stocks of the Day</h2>
        <ul>
          {topStocks.map((stock) => (
            <li key={stock.symbol}>
              {stock.symbol}: ${stock.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Trading;
