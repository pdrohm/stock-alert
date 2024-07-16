type TradeData = {
  s: string; // Symbol
  p: number; // Price
};

type MessageHandler = (data: TradeData[]) => void;

const createSocket = (
  token: string,
  symbols: string[],
  onMessage: MessageHandler,
) => {
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`);
  let isOpen = false;
  let lastProcessedTime = 0;
  const throttleInterval = 1000;

  const subscribeQueue: string[] = [];
  let processingQueue = false;

  const processQueue = () => {
    if (processingQueue || subscribeQueue.length === 0) {
      return;
    }
    processingQueue = true;

    const symbol = subscribeQueue.shift();
    if (symbol && isOpen) {
      socket.send(JSON.stringify({type: 'subscribe', symbol}));
    }

    setTimeout(() => {
      processingQueue = false;
      processQueue();
    }, throttleInterval);
  };

  socket.onopen = () => {
    isOpen = true;
    symbols.forEach(symbol => {
      subscribeQueue.push(symbol);
    });
    processQueue();
  };

  socket.onmessage = event => {
    const currentTime = Date.now();
    if (currentTime - lastProcessedTime >= throttleInterval) {
      lastProcessedTime = currentTime;
      const message = JSON.parse(event.data);
      if (message.type === 'trade') {
        onMessage(message.data);
      }
    }
  };

  socket.onerror = () => {};

  socket.onclose = () => {
    isOpen = false;
  };

  const closeSocket = () => {
    if (isOpen) {
      symbols.forEach(symbol => {
        try {
          socket.send(JSON.stringify({type: 'unsubscribe', symbol}));
        } catch (error) {
          console.error(`Error unsubscribing from ${symbol}:`, error);
        }
      });
      socket.close();
    }
  };

  return {closeSocket};
};

export default createSocket;
