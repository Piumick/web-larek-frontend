
import { ICard } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../base/events";
import {Card} from "./Card"


export class CardFull extends Card {
    protected cardButton: HTMLButtonElement;
    protected cardCategory: HTMLElement;
    protected cardImage: HTMLImageElement;
    protected cardDescription: HTMLElement;

    constructor(protected container:HTMLElement, events: IEvents){
        super(container, events);
        this.cardButton = this.container.querySelector('.card__button') as HTMLButtonElement
        this.cardButton.addEventListener('click', ()=>{
            this.events.emit('card:toogle', {card: this})
        
        })
        this.cardCategory = this.container.querySelector('.card__category') as HTMLElement
        this.cardImage = this.container.querySelector('.card__image') as HTMLImageElement
        this.cardDescription = this.container.querySelector('.card__text') as HTMLElement
    }

    toogleButtonState(isInBasket: boolean){
        if(isInBasket){
            this.cardButton.textContent = "Удалить"
        }
        else{
            this.cardButton.textContent = "В корзину"
        }
    }
    render(cardData:Partial<ICard>){
        if(!cardData) return this.container
        return(super.render(cardData))
        
    }
    set category (category: string){
        this.cardCategory.textContent = category
    }

    set description (desc: string){
        this.cardDescription.textContent = desc
    }

    set image (link: string){
        this.cardImage.src = CDN_URL + link
    }
} 