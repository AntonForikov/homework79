import express from 'express';
import messageRouter from './routes/messages';
import fileDB from './fileDB';

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/messages', messageRouter);

const run = async () => {
  await fileDB.init();

  app.listen(port, () => {
    console.log(`Server running on ${port} port.`);
  });
};

void run();