import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import StockService from '../services/StockService';
import {Stock, StockSymbol} from '../types/StockTypes';

interface StockContextData {
  stocks: StockSymbol[];
  watchedStocks: Stock[];
  addWatchedStock: (symbol: string) => void;
  removeWatchedStock: (symbol: string) => void;
  updateStockPrice: (symbol: string, price: number) => void;
  setStocks: (stocks: StockSymbol[]) => void;
  fetchStocks: () => void;
}

interface StockProviderProps {
  children: ReactNode;
}

const StockContext = createContext<StockContextData | undefined>(undefined);

export const StockProvider: React.FC<StockProviderProps> = ({children}) => {
  const [stocks, setStocksState] = useState<StockSymbol[]>([]);
  const [watchedStocks, setWatchedStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetchStocks();
  });

  const fetchStocks = async () => {
    try {
      const stockList = await StockService.getStocks();
      setStocksState(prevStocks => [...prevStocks, ...stockList]);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const addWatchedStock = async (symbol: string) => {
    try {
      const stockData = await StockService.getStockData(symbol);
      const stockInfo = stocks.find(stock => stock.symbol === symbol);
      if (stockInfo) {
        setWatchedStocks(prevWatchedStocks => [
          ...prevWatchedStocks,
          {
            ...stockData,
            description: stockInfo.description,
            displaySymbol: stockInfo.displaySymbol,
            symbol: stockInfo.symbol,
          },
        ]);
      }
    } catch (error) {
      console.error('Error adding watched stock:', error);
    }
  };

  const removeWatchedStock = (symbol: string) => {
    setWatchedStocks(prevWatchedStocks =>
      prevWatchedStocks.filter(stock => stock.symbol !== symbol),
    );
  };

  const updateStockPrice = (symbol: string, price: number) => {
    setWatchedStocks(prevStocks =>
      prevStocks.map(stock =>
        stock.symbol === symbol ? {...stock, c: price} : stock,
      ),
    );
  };

  const setStocks = (newStocks: StockSymbol[]) => {
    setStocksState(newStocks);
  };

  return (
    <StockContext.Provider
      value={{
        stocks,
        watchedStocks,
        addWatchedStock,
        removeWatchedStock,

        updateStockPrice,
        setStocks,
        fetchStocks,
      }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStockContext = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error('useStockContext must be used within a StockProvider');
  }
  return context;
};