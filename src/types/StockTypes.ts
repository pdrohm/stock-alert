export interface Stock {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
  description: string;
  displaySymbol: string;
  symbol: string;
}

export interface StockSymbol {
  displaySymbol: string;
  symbol: string;
  description: string;
}
