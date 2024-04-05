import express from 'express';
import itemRouter from './routes/item';
import fileDB from './fileDB';
import categoryRouter from './routes/category';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/items', itemRouter);
app.use('/categories', categoryRouter);

const run = async () => {
  await fileDB.initItems();
  await fileDB.initCategories();

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });
};

void run();