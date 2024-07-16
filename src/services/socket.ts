type TradeData = {
  s: string; // Symbol
  p: number; // Price
};

type MessageHandler = (data: TradeData[]) => void;

const createSocket = (token: string, symbols: string[], onMessage: MessageHandler) => {
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);
  let isOpen = false;
  let lastProcessedTime = 0;
  const throttleInterval = 1000; // 1 second

  socket.onopen = () => {
    console.log("WebSocket connection opened.");
    isOpen = true;
    symbols.forEach(symbol => {
      try {
        if (isOpen) {
          socket.send(JSON.stringify({ type: 'subscribe', symbol }));
          console.log(`Subscribed to ${symbol}`);
        }
      } catch (error) {
        console.error(`Error subscribing to ${symbol}:`, error);
      }
    });
  };

  socket.onmessage = (event) => {
    const currentTime = Date.now();
    if (currentTime - lastProcessedTime >= throttleInterval) {
      lastProcessedTime = currentTime;
      const message = JSON.parse(event.data);
      console.log('Received message:', message);
      if (message.type === 'trade') {
        onMessage(message.data);
      }
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
    isOpen = false;
  };

  const closeSocket = () => {
    if (isOpen) {
      symbols.forEach(symbol => {
        try {
          socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
          console.log(`Unsubscribed from ${symbol}`);
        } catch (error) {
          console.error(`Error unsubscribing from ${symbol}:`, error);
        }
      });
      socket.close();
    }
  };

  return { closeSocket };
};

export default createSocket;
