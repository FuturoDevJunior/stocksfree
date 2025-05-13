let socket;

export function connectSocket(onStocksUpdate) {
  socket = new WebSocket('ws://localhost:4000');
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'stocks') {
      onStocksUpdate(data.stocks);
    }
  };
}

export function disconnectSocket() {
  if (socket) {
    socket.close();
    socket = null;
  }
}