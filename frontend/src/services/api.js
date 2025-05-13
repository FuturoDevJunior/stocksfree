import axios from 'axios';

const API_URL = 'http://localhost:4000/api/stocks';

export async function getStocks() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function addStock(symbol) {
  const response = await axios.post(API_URL, { symbol });
  return response.data;
}

export async function removeStock(symbol) {
  const response = await axios.delete(`${API_URL}/${symbol}`);
  return response.data;
}