import express from 'express';
import {MessageWithOutId} from '../types';
import fileDB from '../fileDB';
import {imagesUpload} from '../multer';

const messageRouter = express.Router();

messageRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const {author, message} = req.body;
  if (message === '' || message[0] === ' ') {
    return res.status(404).json({error: 'Message must be present in the request. And can not begin from whitespace!'});
  }

  const objToBase: MessageWithOutId = {
    message,
    author: author === '' || author[0] === ' ' ? 'anonymous' : author,
    image: req.file ? req.file.filename : null
  };
  const result = await fileDB.addItem(objToBase);
  return res.json(result);
});

messageRouter.get('/', async (req, res) => {
  const messages = await fileDB.getItems();
  return res.json(messages);
});
export default messageRouter;