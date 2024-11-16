import './scss/styles.scss';
import { AppApi } from "./components/appApi";
import { Api } from "./components/base/api";
import { EventEmitter } from "./components/base/events";
import { BasketData } from "./components/model/busketData";
import { OrderData } from "./components/model/OrderData";
import { IApi, ICard, IProductList } from "./types";
import { API_URL, settings } from "./utils/constants";
import { CardContainer } from './components/view/CardContainer';
import { cloneTemplate } from './utils/utils';
import { BasketInfo } from './components/view/BasketInfo';
import { CardInBasket } from './components/view/CardInBasket';
import { CardInCatalog} from './components/view/CardInCatalog';
import { CardFull } from'./components/view/CardFull';
import { Modal } from './components/view/Modal';
import { CardsData } from './components/model/CardsData';
import { Form } from './components/view/Form';
import { OrderSuccess} from'./components/view/OrderSuccess';


const cardTemplate: HTMLTemplateElement = document.querySelector('#card-catalog')
const cardTemplate2: HTMLTemplateElement = document.querySelector('#card-basket')
const cardTemplate3: HTMLTemplateElement = document.querySelector('#card-preview')
const contentSec: HTMLElement = document.querySelector('.gallery')
const headerBasket: HTMLElement = document.querySelector('.header__basket')
const modalElement: HTMLElement = document.querySelector('.modal') 
const basketConteiner: HTMLElement = document.querySelector('.basket')
const basketList: HTMLElement = document.querySelector('.basket__list')
const orderFormElement: HTMLElement = document.querySelector('.order') 
const customerFormElement: HTMLElement = document.querySelector('.customer')
const orderSuccessElement: HTMLElement = document.querySelector('.order-success')


const events =  new EventEmitter();

const basketData = new BasketData(events);

const orderData = new OrderData(events)

const baseApi: IApi = new Api(API_URL, settings);

const api = new AppApi(baseApi)

const cardContainer = new CardContainer(contentSec)

const basket = new BasketInfo(headerBasket, events)

const basketInfo = new BasketInfo(headerBasket, events)

const cardFull = new CardFull(cloneTemplate(cardTemplate3), events)

const modal = new Modal(modalElement, events)

const cardsData = new CardsData

const basketCardContainer = new CardContainer(basketList)

const basketFull = new BasketInfo(basketConteiner, events)

const orderForm = new Form(orderFormElement, events)

const customerForm = new Form(customerFormElement, events)

const orderSuccess = new OrderSuccess(orderSuccessElement, events)


api.getProducts().then((res) => {
  cardsData.catalog = res.items
  events.emit('initialData:loaded')
})
.catch((err)=>{
  console.log(err)
})

events.on('initialData:loaded', () => {
   const productList = cardsData.catalog.map((card)=>{
    const cardInstant = new CardInCatalog(cloneTemplate(cardTemplate), events);
		return cardInstant.render(card);
    
   })
   cardContainer.render({ catalog: productList });
})

events.on('cardFull:open', (card: {card: CardInCatalog})=>{
  modal.content = cardFull.render(cardsData.getById(card.card.id))
  cardFull.toogleButtonState(basketData.isInBasket(card.card.id))
  modal.open()
})

events.on('basket:changed', () => {
  basketInfo.render({counter: basketData.getCount()}) 
  basketFull.render({price: basketData.getTotal()})
  const productList = basketData.getBusketData().map((card, index)=>{
    const cardInstant = new CardInBasket(cloneTemplate(cardTemplate2), events);
		return cardInstant.render(card, index);
   })
  basketCardContainer.render({ catalog: productList })
  basketFull.toogleBasketButton(basketData.checkValidation())

})

events.on('card:toogle', (card: {card: CardFull})=>{
  if(!basketData.isInBasket(card.card.id)){
    basketData.addProduct(card.card.id, cardsData.catalog)
    cardFull.toogleButtonState(basketData.isInBasket(card.card.id))
  }
  else{
    basketData.deleteProduct(card.card.id)
    cardFull.toogleButtonState(basketData.isInBasket(card.card.id))
  }
  modal.close()
})

events.on('card:delete', (card: {card:CardInBasket})=>{
  basketData.deleteProduct(card.card.id)

})

events.on('busket:open', () => {
  basketFull.toogleBasketButton(basketData.checkValidation())
  const productList = basketData.getBusketData().map((card)=>{
    const cardInstant = new CardInBasket(cloneTemplate(cardTemplate2), events);
		return cardInstant.render(card);
   })
  
  basketCardContainer.render({ catalog: productList })
  modal.content = basketConteiner
  modal.open()
})

events.on('order:open', () => {
  orderData.goods = basketData.getBusketData()
  modal.content = orderFormElement.parentNode as HTMLElement
})

events.on('altButtons:change', (data: {buttons: NodeListOf<HTMLButtonElement>, button: HTMLButtonElement}) => {
  orderForm.togleAltButtons(data.button, data.buttons)
  orderData.payment = data.button.textContent
  orderForm.togleSubmitButton(orderData.checkOrderFormValidation())
})

events.on('order:input', (data: {field: string, value: string}) => {
  if (data.field === "address") orderData.adress = data.value

  orderForm.togleSubmitButton(orderData.checkOrderFormValidation())
})

events.on('order:submit', () => {
  modal.content = customerFormElement.parentNode as HTMLElement
})

events.on('customer:input', (data: {field: string, value: string}) =>{
  if (data.field === "email"){ orderData.email = data.value};
  if (data.field === "phone"){orderData.phone = data.value};
  customerForm.togleSubmitButton(orderData.checkCustomerFormValidation())
})

events.on('customer:submit', ()=>{

  api.postOrder(orderData.getOrderInfo()).then((res)=>{
    orderSuccess.total = basketData.getTotal() + " синапсов"
  modal.content = orderSuccessElement}
).catch((err)=>{
  console.log(err)
})})

events.on('success:close', () => {
  basketData.clearBusket()
  customerForm.formReset()
  orderForm.formReset()
  modal.close()
})