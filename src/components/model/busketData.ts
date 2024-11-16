import { TCardInBasket, ICard, IBasketData, IOrder, IProductList } from "../../types";
import { IEvents } from "../base/events";


export class BasketData implements IBasketData {
  protected goods: ICard[];
  protected events: IEvents;


  constructor( events: IEvents){
    this.events = events
    this.goods = []
  }

  getTotal(): number {
    let total = 0
    for(let item of this.goods){
      total+= item.price
    }
    return total
  };

  isInBasket(id: string): boolean{
    return Boolean(this.goods.find((item: ICard)=> id == item.id)) 
  }

  addProduct(productId: string, productList: ICard[]): void {
    this.goods.push(productList.find((item: ICard) => item.id == productId))
    this.events.emit('basket:changed')
   }

  getBusketData(): ICard[]{
    return this.goods
  }
  
  clearBusket(): void{
    this.goods = []
    this.events.emit('basket:changed')
  }
  
  deleteProduct(productId: string): void {
    this.goods = this.goods.filter((el) => el.id !== productId)
    this.events.emit('basket:changed')
  }
  
  getCount(){
    return this.goods.length
  }

  checkValidation(): boolean{
    if(this.isInBasket('b06cde61-912f-4663-9751-09956c0eed67') || this.goods.length === 0) return false
    else return true
  }
}
