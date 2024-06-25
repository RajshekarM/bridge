import { useEffect, useState } from 'react';
import TickerTable from '../components/TickerTable';
import { WebSocketProvider } from '../services/WebSocketProvider';


const Trading = () => {
  const [marketData, setMarketData] = useState<{ timestamp: string, price: string } | null>(null);
  const [topStocks, setTopStocks] = useState<{ symbol: string, price: number }[]>([]);
  const [activeTab, setActiveTab] = useState('watchlist');
  const tabs = [
    { name: 'Watchlist', key: 'watchlist' },
    { name: 'Trending Stocks', key: 'trending' },
    { name: 'Top 10 Stocks', key: 'top10' }
  ];

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



  const renderTabContent = () => {
    switch (activeTab) {
      case 'watchlist':
        return <div>
          <WebSocketProvider>   
              <TickerTable />
          </WebSocketProvider>
        </div>
      case 'trending':
        return <div>Trending Stocks content here...</div>;
      case 'top10':
        return <div>Top 10 Stocks content here...</div>;
      default:
        return null
    }
  };




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
      <h1 className="text-3xl font-bold text-center mb-10">Trading Page</h1>
      <div className="mb-10">
        <div className="flex justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 mx-2 rounded-t-lg ${
                activeTab === tab.key
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className='w-1/5 rounded-lg text-center bg-red-500 text-white'>Set Mobile Notification</div>;
        <div className="border border-t-0 rounded-b-lg p-4 bg-white shadow-md">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Trading;
