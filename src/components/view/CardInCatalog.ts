import { ICard } from "../../types";
import { CDN_URL } from "../../utils/constants";
import { IEvents } from "../base/events";
import { Card } from "./Card";

export class CardInCatalog extends Card {
    protected cardCategory: HTMLElement;
    protected cardImage: HTMLImageElement;

    constructor(protected container:HTMLElement, events: IEvents){
        super(container, events)
        this.cardCategory = this.container.querySelector('.card__category')
        this.cardImage = this.container.querySelector('.card__image')

        container.addEventListener('click',()=>{
        events.emit('cardFull:open', {card : this})
    })
    }

    render(cardData: Partial<ICard>): HTMLElement{
        if(!cardData) return this.container
        return(super.render(cardData))
    }
    set category(category: string){
        this.cardCategory.textContent = category 

    }
    set image(image: string){
        this.cardImage.src = CDN_URL + image
    }
}