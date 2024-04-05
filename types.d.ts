
export interface Item {
  id: string,
  categoryId: string,
  locationId: string,
  name: string,
  description: string | null,
  image: string | null
}

export type ItemWithOutId = Omit<Item, 'id'>;

export interface Category {
  id: string,
  title: string,
  description: string | null
}

export type CategoryWithoutId = Omit<Category, 'id'>;