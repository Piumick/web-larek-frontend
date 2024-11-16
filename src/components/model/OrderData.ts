import { ICard, IOrder, paymentMetod, TCardInBasket } from "../../types";
import { IEvents } from "../base/events";

export class OrderData {
  items: ICard[];
  _address: string;
  _phone: string;
  _email: string;
  _payment: paymentMetod;
  events: IEvents

  constructor(events: IEvents){
    this.events = events
  }
  set goods (goods: ICard[]){
    this.items = goods
  }

  protected getTotal(items: ICard[]): number {
    
    let total = 0
    for(let item of items){
      total+= item.price
    }
    return total
  };
  protected getIdList (items: ICard[]): string[] {
    let list = []
    for(let item of items){
      list.push(item.id)
    }
    return list
  };

  public getOrderInfo(): IOrder {
    return {
      payment: this._payment,
      email: this._email,
      phone: this._phone,
      address: this._address,
      total: this.getTotal(this.items),
      items: this.getIdList(this.items)
    }
  };
  checkOrderFormValidation(){
    if (!this._payment) return false
    if(!this._address || this._address === "") return false
    else return true
  }

  checkCustomerFormValidation(){
    if(!this._email || this._email === "") return false
    if(!this._phone || this._phone === "") return false
    else return true
  }

  set payment(value: string){
    if(value === 'Онлайн')this._payment = 'online'
    if(value === 'При получении') this._payment = 'ofline' 
    
  }
  set email(value: string){
    this._email = value
  }
  set adress(value: string){
    this._address = value
  }
  set phone(value: string){
    this._phone = value
  }
  get valid(): boolean{
    return this.valid
  }

}