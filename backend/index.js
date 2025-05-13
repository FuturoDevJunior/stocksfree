const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Estado global das ações
let stocks = [];

// Função para buscar dados de uma ação (exemplo com Alpha Vantage, troque pela sua API preferida)
async function fetchStockData(symbol) {
  // Substitua pela sua chave de API e endpoint
  const API_KEY = 'demo'; // Troque por sua chave real
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return null;
  }
}

// API REST para listar ações
app.get('/api/stocks', (req, res) => {
  res.json(stocks);
});

// API REST para adicionar ação
app.post('/api/stocks', async (req, res) => {
  const { symbol } = req.body;
  if (!symbol || stocks.find(s => s.symbol === symbol)) {
    return res.status(400).json({ error: 'Código inválido ou já adicionado.' });
  }
  const data = await fetchStockData(symbol);
  if (!data || data['Error Message']) {
    return res.status(404).json({ error: 'Ação não encontrada.' });
  }
  const stock = { symbol, data };
  stocks.push(stock);
  broadcastStocks();
  res.json(stock);
});

// API REST para remover ação
app.delete('/api/stocks/:symbol', (req, res) => {
  const { symbol } = req.params;
  const idx = stocks.findIndex(s => s.symbol === symbol);
  if (idx === -1) {
    return res.status(404).json({ error: 'Ação não encontrada.' });
  }
  stocks.splice(idx, 1);
  broadcastStocks();
  res.json({ success: true });
});

// WebSocket: envia lista de ações para todos os clientes
function broadcastStocks() {
  const payload = JSON.stringify({ type: 'stocks', stocks });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on('connection', ws => {
  ws.send(JSON.stringify({ type: 'stocks', stocks }));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});