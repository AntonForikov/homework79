import {promises as fs} from 'fs';
import {Item, ItemWithOutId} from './types';

const itemFilename = './items.json';
let itemList: Item[] = [];

const fileDB = {
  async initItems (){
    try {
      const fileContents = await fs.readFile(itemFilename);
      itemList = JSON.parse(fileContents.toString());
    } catch  {
      itemList = [];
    }
  },

  async getItems () {
    return itemList;
  },

  async getItemById (id: string) {
    return itemList.find(item => item.id === id);
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
  },

  async deleteItem (id: string) {
    const items = await this.getItems();
    itemList = items.filter((item) => item.id !== id);
    await this.saveItem();
  },

  async updateItem (id: string, newItem: Item) {
    const items = await this.getItems();
    itemList = items.map((item) => {
      if (item.id === id) return {...newItem};
      return item;
    });
    await this.saveItem();
  }
};

export default fileDB;