import express from 'express';
import fileDB from '../fileDB';
import {imagesUpload} from '../multer';
import {ItemWithOutId} from '../types';

const itemRouter = express.Router();

itemRouter.post('/', imagesUpload.single('image'), async (req, res) => {
  const {categoryId, locationId, name, description} = req.body;

  if (!categoryId || !locationId || !name) {
    return res.status(400).json({error: 'categoryId, locationId, name required for this request and can not be an empty string'});
  }

  if (typeof (categoryId) !== 'string') {
    return res.status(400).json({error: 'categoryId type must ba a string.'});
  } else if (categoryId[0] === ' ') {
    return res.status(400).json({error: 'categoryId can not begin from whitespace.'});
  }

  if (typeof (locationId) !== 'string') {
    return res.status(400).json({error: 'locationId type must ba a string.'});
  } else if (locationId[0] === ' ') {
    return res.status(400).json({error: 'locationId can not begin from whitespace.'});
  }

  if (typeof (name) !== 'string') {
    return res.status(400).json({error: 'name type must ba a string.'});
  } else if (name[0] === ' ') {
    return res.status(400).json({error: 'name can not begin from whitespace.'});
  }


  const objToBase: ItemWithOutId = {
    categoryId,
    locationId,
    name,
    description: description && typeof (description) === 'string'
      ? description[0] === ' '
        ? null
        : description
      : null,
    image: req.file ? req.file.filename : null
  };
  const result = await fileDB.addItem(objToBase);
  return res.json(result);
});

itemRouter.get('/', async (req, res) => {
  const messages = await fileDB.getItems();
  return res.json(messages);
});
export default itemRouter;