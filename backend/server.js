import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import seedRouter from './Routes/SeedRoutes.js';
import productRouter from './Routes/ProductRoute.js';
import userRouter from './Routes/UserRoute.js';

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'amazona' })
  .then(() => {
    console.log('Successfully Conneted to Mongo_db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);

app.use('/api/products', productRouter);

app.use('/api/users', userRouter);

app.use((error, req, res, next) => {
  res.status(500).send({ message: error.message });
});

const port = 8080;

app.listen(port, () => {
  console.log(`Successfully Serve at Port http://localhost:${port}`);
});
