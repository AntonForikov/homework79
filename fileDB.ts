import {promises as fs} from 'fs';
import {Item, ItemWithOutId} from './types';

const itemFilename = './items.json';
let itemList: Item[] = [];

const fileDB = {
  async initItems (){
    try {
      const fileContents = await fs.readFile(itemFilename);
      itemList = JSON.parse(fileContents.toString());
      // if (sync.existsSync(filename)) {
      //
      // } else {
      //   await this.addItem({author: 'initial', message: 'message'})
      // }
    } catch  {
      itemList = [];
    }
  },

  async getItems () {
    return itemList;
  },

  async addItem (itemToAdd: ItemWithOutId) {
    const item: Item = {
      id: crypto.randomUUID(),
      ...itemToAdd,
    };

    itemList.push({...item});
    await this.saveItem();

    return item;
  },

  async saveItem () {
    await fs.writeFile(itemFilename, JSON.stringify(itemList, null, 2));
  }
};

export default fileDB;