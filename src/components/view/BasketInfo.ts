import { IEvents } from "../base/events";
import { BasketData } from "../model/busketData";
import { Component } from "./Component";

interface IBasketInfo {

    counter : number;
    price : number

}

export class BasketInfo {

    protected events : IEvents
    protected basketCounter : HTMLElement;
    protected basketButton : HTMLButtonElement;
    protected basketPrice : HTMLElement

    constructor (protected container: HTMLElement, events: IEvents){
        this.events = events
        this.container = container
        this.basketCounter = container.querySelector('.header__basket-counter')
        this.basketPrice = container.querySelector('.basket__price')
        this.basketButton = container.querySelector('.button')

        if (container.classList[0] === "header__basket"){
            this.container.addEventListener('click', ()=>{ 
                events.emit('busket:open')
            })
        }
        else {
            this.basketButton.addEventListener('click', ()=> {
                events.emit('order:open')
        })
    }

    }
    render(basketData?: Partial<IBasketInfo>){
        if(!basketData) return this.container
        if (this.container.classList[0] === "header__basket"){
            if(basketData.counter || basketData.counter === 0) this.basketCounter.textContent = basketData.counter + ""
        }
        else{
            if(basketData.price || basketData.price === 0){
                
                 this.basketPrice.textContent = basketData.price + " синапсов"
                
            }
        }   
    }

    toogleBasketButton(isValid: boolean){
        this.basketButton.disabled = !isValid

    }


}