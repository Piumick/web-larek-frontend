import { Component } from "./Component";

interface ICardContainer {
    catalog: HTMLElement[]
}

export class CardContainer extends Component<ICardContainer>{
    protected _catalog: HTMLElement[];


    constructor(protected container: HTMLElement){
        super(container)
        this.container = container;
    }

    set catalog(items:HTMLElement[]){
        
        this.container.replaceChildren(...items)
    }
    
}