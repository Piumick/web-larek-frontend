import { IEvents } from "../base/events";

export class OrderSuccess {
    protected _total: HTMLElement;
    protected button: HTMLButtonElement;
    constructor(element: HTMLElement, events: IEvents){
       this.button = element.querySelector('.order-success__close') as HTMLButtonElement
       this._total = element.querySelector('.film__description') as HTMLElement
       this.button.addEventListener('click', () => {
        events.emit('success:close')
       })
    }
    set total(value: string){
        this._total.textContent = value 
    }
    
}