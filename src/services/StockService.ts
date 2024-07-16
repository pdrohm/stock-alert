import {URL_API_TOKEN} from '@env';
import {Stock, StockSymbol} from '../types/StockTypes';
import api from './Api';

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

const getStocks = async (
  page: number,
  limit: number = 20,
): Promise<StockSymbol[]> => {
  try {
    const response = await api.get('/stock/symbol', {
      params: {
        exchange: exchange,
        token: URL_API_TOKEN,
      },
    });

    // Filtrar apenas os campos necessários e limitar a quantidade de dados
    const stockList = response.data
      .slice((page - 1) * limit, page * limit)
      .map((stock: any) => ({
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
