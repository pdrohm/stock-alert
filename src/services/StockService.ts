import {Stock, StockSymbol} from '../types/StockTypes';
import api, {API_TOKEN} from './Api';

const exchange = 'US';

const getStockData = async (symbol: string): Promise<Stock> => {
  try {
    console.log('symbol', symbol);
    const response = await api.get('/quote', {
      params: {symbol},
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};

const getStocks = async (page: number): Promise<StockSymbol[]> => {
  try {
    const response = await api.get('/stock/symbol', {
      params: {exchange, limit: 20, offset: (page - 1) * 20, token: API_TOKEN},
    });
    const stockList = response.data.map((stock: any) => ({
      displaySymbol: stock.displaySymbol,
      description: stock.description,
      symbol: stock.symbol,
    }));
    return stockList;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

const addPriceAlert = async (symbol: string, price: number): Promise<void> => {
  console.log(`Price alert set for ${symbol} at $${price}`);
};

const searchStock = async (query: string) => {
  try {
    const response = await api.get('/search', {
      params: {q: query},
    });
    return response.data.result;
  } catch (error) {
    console.error('Error fetching symbols:', error);
    return [];
  }
};

export default {
  getStockData,
  getStocks,
  addPriceAlert,
  searchStock,
};
