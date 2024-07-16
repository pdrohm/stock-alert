import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {showNotification} from '../config/PushNotificationConfig';
import StockService from '../services/StockService';

interface Alert {
  symbol: string;
  price: number;
}

interface AlertContextProps {
  alerts: Alert[];
  addAlert: (symbol: string, price: number) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({children}: {children: ReactNode}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const addAlert = (symbol: string, price: number) => {
    setAlerts([...alerts, {symbol, price}]);
  };

  useEffect(() => {
    const checkPrices = async () => {
      for (const alert of alerts) {
        const stockPrice = await StockService.getStockPrice(alert.symbol);
        if (stockPrice > alert.price) {
          showNotification(
            'Price Alert',
            `The price of ${alert.symbol} has exceeded ${alert.price}`,
          );
        }
      }
    };

    const interval = setInterval(checkPrices, 60000);

    return () => clearInterval(interval);
  }, [alerts]);

  return (
    <AlertContext.Provider value={{alerts, addAlert}}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlertContext = (): AlertContextProps => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};
