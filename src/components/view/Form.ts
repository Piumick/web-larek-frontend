import { IEvents } from "../base/events";
import { Component } from "./Component";

interface IForm {
	valid: boolean;
	inputValues: Record<string, string>;
}

export class Form extends Component <IForm>{
    protected inputs: NodeListOf<HTMLInputElement>;
    protected altButtons: NodeListOf<HTMLButtonElement>
    protected submitButton: HTMLButtonElement;
    protected formName: string;
    protected _form: HTMLFormElement;
    protected events: IEvents

    constructor(protected container: HTMLElement, events:IEvents){
        super(container)
        this.events = events
        this.inputs = this.container.querySelectorAll<HTMLInputElement>('.form__input');
        this._form = container.parentNode as HTMLFormElement
        this.formName = this._form.children[0].classList[0]

        this.submitButton = this._form.querySelector('.submit-button')
        this.inputs.forEach((input) => {
            this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                this.events.emit(`${this.formName}:submit`, this.getInputValues());
            });
            this._form.addEventListener('input', (event: InputEvent) => {
                const target = event.target as HTMLInputElement;
                const field = target.name;
                const value = target.value;
                this.events.emit(`${this.formName}:input`, { field, value });
            });
        })
        if(this.formName === 'order'){
            this.altButtons = container.querySelectorAll<HTMLButtonElement>('.button_alt') 
            this.altButtons.forEach((button) => {
                button.addEventListener('click', (evt)=>{
                    this.events.emit('altButtons:change', {buttons: this.altButtons, button: evt.target})
                })
            })
        }
    }
    protected getInputValues() {
		const valuesObject: Record<string, string> = {};
		this.inputs.forEach((element) => {
			valuesObject[element.name] = element.value;
		});
		return valuesObject;
	}
    set inputValues(data: Record<string, string>) {
		this.inputs.forEach((element) => {
			element.value = data[element.name];
		});
	}

	set valid(isValid: boolean) {
		this.submitButton.disabled = isValid
	}
    get form() {
		return this._form;
	}
    togleAltButtons(button: HTMLButtonElement, buttons: NodeListOf<HTMLButtonElement>){


        button.classList.add('button_alt-active')

        buttons.forEach((el: HTMLButtonElement)=>{
            if (el !== button){
                el.disabled = false
                el.classList.remove('button_alt-active')
            }
        })
    }
    togleSubmitButton(isValid: boolean){
        this.submitButton.disabled = !isValid
    }

	formReset() {
		this._form.reset();
        if(this.altButtons){
            this.altButtons.forEach((el: HTMLButtonElement)=>{
                el.disabled = false
                el.classList.remove('button_alt-active')  
            })

        }
	}
    

}
