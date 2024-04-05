import express from 'express';
import itemRouter from './routes/item';
import fileDB from './fileDB';
import categoryRouter from './routes/category';
import locationRouter from './routes/location';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/items', itemRouter);
app.use('/categories', categoryRouter);
app.use('/locations', locationRouter);

const run = async () => {
  await fileDB.initItems();
  await fileDB.initCategories();
  await fileDB.initLocations();

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });
};

void run();