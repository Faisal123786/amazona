import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (request, response) => {
  response.send(data.products);
});

const port = 8080;

app.listen(port, () => {
  console.log(`Successfully Serve at Port http://localhost:${port}`);
});
