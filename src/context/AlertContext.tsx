import React, {createContext, useContext, useState, ReactNode} from 'react';

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
