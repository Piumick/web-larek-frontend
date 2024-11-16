import { IEvents } from "../base/events";
import { Component } from "./Component";

export class Modal{
    protected modal: HTMLElement
    protected _content: HTMLElement;
    protected events: IEvents;
    protected modalContent: HTMLElement;

    constructor(modal: HTMLElement, events: IEvents){

        this.events = events;
        this.modal = modal

        const closeButtonElement = this.modal.querySelector('.modal__close');
        closeButtonElement.addEventListener('click', this.close.bind(this));
        this.modal.addEventListener('mousedown', (evt: Event)=>{
            if (evt.target === evt.currentTarget){
                this.close()
            }
        });
        this.handleEscUp = this.handleEscUp.bind(this)
        this.modalContent = this.modal.querySelector('.modal__content')
    }


    open(){
        this.modal.classList.add('modal_active')
        document.addEventListener('keyup', this.handleEscUp)
    }
    close(){

        this.modal.classList.remove('modal_active')
        document.removeEventListener('keyup', this.handleEscUp)
    }
    handleEscUp(evt: KeyboardEvent) {
        if(evt.key === "Escape"){
            this.close
        }
    }
    set content(content: HTMLElement){
        this.modalContent.replaceChildren(content)

    }
}