import express from 'express';
import data from '../data.js';
import Product from '../Models/ProductModel.js';
import User from '../Models/UserModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  try {
    await Product.remove({});
    const createProduct = await Product.insertMany(data.products);
    await User.remove({});
    const createUser = await User.insertMany(data.users);
    res.send({ createUser, createProduct });
  } catch (error) {
    console.log(error);
  }
});

export default seedRouter;
