import { ICard, TBaseCard } from "../../types";
import { IEvents } from "../base/events";
import { Component } from "../view/Component";

export abstract class Card extends Component<ICard> {
    protected events: IEvents;
    protected name: HTMLElement;
    protected productPrice: HTMLElement;
    protected cardId: string;

    constructor(protected container: HTMLElement, events: IEvents){
        super(container)
        this.events = events
        this.name = this.container.querySelector('.card__title')
        this.productPrice = this.container.querySelector('.card__price')
        
    }
    render(cardData?: Partial<ICard>){
        if(!cardData) return this.container
        return(super.render(cardData))
    }
    
    set price(price: number | null){
        if (price === null){
            this.productPrice.textContent = "бесценно"
        }
         else {
            this.productPrice.textContent = price + " синапсов"
        }
    }
    get id(){
        return this.cardId
    }

    set title(name: string){
        this.name.textContent = name
    }

    set id(id: string){

        this.cardId = id

    }
    deleteCard() {
        this.container.remove()
        this.container = null;
    }
}