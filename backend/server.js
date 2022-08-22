import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products', (request, response) => {
  response.send(data.products);
});

app.get('/api/products/slug/:slug', (request, response) => {
  const product = data.products.find((y) => y.slug == request.params.slug);
  if (product) {
    response.send(product);
  } else {
    response.status(404).send({ message: 'Product Not Found' });
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Successfully Serve at Port http://localhost:${port}`);
});
