
export interface Message {
  id: string,
  message: string,
  author: string,
  image: string | null
}

export type MessageWithOutId = Omit<Message, 'id'>
