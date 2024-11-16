import { ICard } from "../../types";
import { IEvents } from "../base/events";
import { Card } from "./Card";

export class CardInBasket extends Card{
    protected cardButton: HTMLButtonElement;
    protected cardIndex: HTMLElement;
    constructor(protected container: HTMLElement, events:IEvents){
        super(container, events)
        this.cardButton = this.container.querySelector('.card__button')
        this.cardIndex = this.container.querySelector('.basket__item-index')
        this.cardButton.addEventListener('click', ()=>{
            this.events.emit('card:delete', {card: this})

        })
        
    }
    
    
    render(data?: Partial<ICard>):HTMLElement
    render(cardData: Partial<ICard>, index: number):HTMLElement
    
    render(cardData: Partial<ICard> | undefined, index?: number){
        if(index) this.cardIndex.textContent = index + ""
        if(!cardData) return this.container
        
        return (super.render(cardData))

    }
    
}