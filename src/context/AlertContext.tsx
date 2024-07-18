import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {showNotification} from '../config/PushNotificationConfig';
import StockService from '../services/StockService';
import {Alert} from 'react-native';

interface AlertType {
  symbol: string;
  price: number;
  lastNotificationTime?: number;
  notified?: boolean;
}

interface AlertContextProps {
  alerts: AlertType[];
  addAlert: (symbol: string, price: number) => void;
  removeAlert: (symbol: string) => void;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({children}: {children: ReactNode}) => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);

  const addAlert = (symbol: string, price: number) => {
    setAlerts(prevAlerts => [...prevAlerts, {symbol, price}]);
    Alert.alert('Success', 'Alerts added successfully');
  };

  const removeAlert = (symbol: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.filter(alert => alert.symbol !== symbol),
    );
  };

  const checkAlerts = async () => {
    const updatedAlerts = await Promise.all(
      alerts.map(async alert => {
        try {
          const stockPrice = await StockService.getStockPrice(alert.symbol);

          if (stockPrice > alert.price) {
            if (
              !alert.lastNotificationTime ||
              Date.now() - alert.lastNotificationTime > 3600000
            ) {
              showNotification(
                'Price Alert',
                `The price of ${alert.symbol} has exceeded ${alert.price}`,
              );

              return {
                ...alert,
                notified: true,
                lastNotificationTime: Date.now(),
              };
            }
          }

          return {
            ...alert,
            notified: false,
          };
        } catch (error) {
          console.error(
            `Error fetching stock price for ${alert.symbol}:`,
            error,
          );
          return alert;
        }
      }),
    );

    setAlerts(updatedAlerts);
  };

  useEffect(() => {
    const interval = setInterval(checkAlerts, 60000);

    return () => clearInterval(interval); // eslint-disable-next-line
  }, []);

  return (
    <AlertContext.Provider value={{alerts, addAlert, removeAlert}}>
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
