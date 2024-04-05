import express from 'express';
import itemRouter from './routes/item';
import fileDB from './fileDB';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/items', itemRouter);

const run = async () => {
  await fileDB.initItems();
  await fileDB.initCategories();

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });
};

void run();