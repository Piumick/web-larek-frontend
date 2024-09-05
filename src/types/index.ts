
export type paymentMetod = 'online' | 'ofline';

export interface ICard {
  id: string
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

export interface IOrder{
  payment: paymentMetod;
  email: string;
  phone: string;
  adress: string;
  total: number;
  items: string[]
}

export interface IBusket{
  goods: TCardInBusket[];
  total: number;
}

export interface IBusketData{
  getBusketData(): TCardInBusket[];
  clearBusket(): void;
  addProdukt(productId: string): void;
  deleteProduct(productId: string): void
}

export interface IOrderData{
  getOrderInfo(): IOrder
  setOrderInfo(orderInfo: IOrder): void;
  checkValidation(data: Record<keyof IOrder, string>): boolean;
}

export type TCardInCatalog = Pick<ICard, 'title' | 'image' | 'category' | 'price'>
export type TCardInBusket = Pick<ICard, 'title' | 'price'>
export type TcardInfo = Pick<ICard, 'title' | 'price' | 'image' | 'category' | 'description'>

export type TTotalPrice = Pick<IBusket, 'total'>
