

export type paymentMetod = 'online' | 'ofline';

export interface ICard {
  id: string
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

export interface IProductList {
  items: ICard[]
  total: number
}

export interface IOrder{
  payment: paymentMetod;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}



export interface IBasketData{
  getBusketData(): ICard[];
  clearBusket(): void;
  addProduct(productId: string, productList: ICard[]): void;
  deleteProduct(productId: string): void
}

export interface IOrderData{
  getOrderInfo(): IOrder
  setOrderInfo(orderInfo: IOrder): void;
  checkValidation(data: Record<keyof IOrder, string>): boolean;
}
export type TBaseCard = Pick<ICard, 'id' | 'price' | 'title'>
export type TCardInCatalog = Pick<ICard, 'title' | 'image' | 'category' | 'price'>
export type TCardInBasket = Pick<ICard, 'title' | 'price' | 'id'>
export type TCardInfo = Pick<ICard, 'title' | 'price' | 'image' | 'category' | 'description'>
export type TCardType = 'CardInCatalog' | 'CardInBasket' | 'CardInfo'


export type ModElement = 'HTMLButtonElement'  | 'HTMLInputElement' 



export interface IApi {
  baseUrl: string;
  get<T>(uri:string): Promise<T>
  post<T>(uri: string, data: object, method?: ApiPostMethods): Promise<T>
}
export type ApiListResponse<Type> = {
  total: number,
  items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';