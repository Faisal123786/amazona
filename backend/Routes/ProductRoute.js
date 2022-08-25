import express, { response } from 'express';
import Product from '../Models/ProductModel.js';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/slug/:slug', async (request, response) => {
  const product = await Product.findOne({ slug: request.params.slug });
  if (product) {
    response.status(200).send(product);
  } else {
    response.status(404).send({ message: 'Product Not Found' });
  }
});

productRouter.get('/:id', async (request, response) => {
  const product = await Product.findById(request.params.id);
  if (product) {
    response.status(200).send(product);
  } else {
    response.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRouter;
