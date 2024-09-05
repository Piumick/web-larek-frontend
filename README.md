https://github.com/Piumick/web-larek-frontend.git


# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка 

```
npm run build
```

или

```
yarn build
```


## Данные и типы данных использованных в приложении

Данные карточки товара
```
export interface ICard {
  id: string
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
}
```

Данные карточки товара, используемые на главной странице с каталогом
```
export type TCardInCatalog = Pick<ICard, 'title' | 'image' | 'category' | 'price'>
```

Данные карточки товара, используемые в окне с подробной информацией
```
export type TcardInfo = Pick<ICard, 'title' | 'price' | 'image' | 'category' | 'description'>
```

Данные карточки товара, используемые в отображении в корзине
```
export type TCardInBusket = Pick<ICard, 'title' | 'price'>
```


Данные заказа
```
export interface IOrder{
  payment: paymentMetod;
  email: string;
  phone: string;
  adress: string;
  total: number;
  items: string[]
}
```
Данные корзины

```
export interface IBusket{
  goods: TCardInBusket[];
  total: number;
}
```
Данные суммы заказа
```
export type TTotalPrice = Pick<IBusket, 'total'>
```
Данные доступные для выбора в графе способ оплаты
```
type paymentMetod = 'online' | 'ofline';
```


## Архетектура приложения
Используется архетектурный шаблон MVP, который подразумевает деление кода на 3 слоя: Model, View, Presenter 

#### Model 
(Модель) работает с данными, проводит вычисления и руководит всеми бизнес-процессами.

#### View
(Вид или представление) показывает пользователю интерфейс и данные из модели.

#### Presenter
(Представитель) служит прослойкой между моделью и видом.

### Базовый код

#### Класс Api
Содержит в себе базовую логику отправки запросов. В конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов.
Методы: аап
- `get` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове.

#### Класс EventEmitter
Брокер событий позволяет отправлять события и подписываться на события, происходящие в системе. Класс используется в презентере для обработки событий и в слоях приложения для генерации событий.  
Основные методы, реализуемые классом описаны интерфейсом `IEvents`:
- `on` - подписка на событие
- `emit` - инициализация события
- `trigger` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие

### Слой model

#### Класс BusketData
отвечает за хранение и логику работы с данными корзины\
конструктор класса принимает инстант брокера событий\ 
В полях класса храняться следующие данные:\
- _goods: TCardInBusket[] - массив обьектов товаров.
- _total: number - стоимость всех товаров.
- events: IEvents - Экземпляр класса `EventEmitter` для инициации событий при изменении данных.

Также клас предоставляет набор методов для работы с этими данными.
- getBusketData(): TCardInBusket[] - возвращает массив объектов товаров
- clearBusket(): void; - очищает массив объектов товаров
- addProdukt(productId: string): void - принимает ID товара в параметрах и добавляет товар с таким ID в массив объектов товаров
- deleteProduct(productId: string): void - принимает ID товара в параметрах и удаляет товар с таким ID из массива объектов товаров
- а также сеттеры и геттеры для сохранения и получекния данных из полей класса

#### Класс OrderData 
отвечает за хранение и логику работы с данными заказа.\
конструктор класса принимает инстант брокера событий\ 
В полях класса храняться следующие данные:\
- payment: paymentMetod - данные о способе оплаты
- email: string - email адресс заказчика
- phone: string - моб. телефон заказчика
- adress: string - адрес заказчика
- total: number - сумма заказа
- items: string[] - массив ID товаров  

Также клас предоставляет набор методов для работы с этими данными.

- getOrderInfo(): IOrder - возвращает данные о заказе
- setOrderInfo(orderInfo: IOrder): void - принимает объект с данными о товаре и сохраняет в классе
- checkValidation(data: Record<keyof IOrder, string>): boolean - проверяет объект с данными пользователя на валидность.

### Слой View
Все классы представления отвечают за отображения внутри контейнера (DOM елемент) переданных в них данных

#### Класс Modal
Реализует модальное окно. Так же предоставляет методы `open` и `close` для управления отображением модального окна. Устанавливает слушатели на клавиатуру, для закрытия модального окна по Esc, на клик в оверлей и кнопку-крестик для закрытия попапа.  
- constructor(modlSelector: string, templateSelector: string, events: IEvents) Конструктор принимает селектор, по которому в разметке страницы будет идентифицировано модальное окно, селектор темплейта и экземпляр класса `EventEmitter` для возможности инициации событий.

Поля класса
- modal: HTMLElement - элемент модального окна
- events: IEvents - брокер событий
- template: HTMLElement - Элемент встраиваемый в модальное окно


#### Класс ModalCardFull
Расширяет класс Modal. Предназначен для реализации модального окна подробной информации о товаре. При открытии модального окна получает данные товара При нажатии на кнопку инициируется событие.
Поля класса:
- Button: HTMLButtonElement - Кнопка добавления в корзину

Методы:
- addToBusket(): void - иницирует событие 
- open(data: TCardInfo): void - расширение родительского метода, принимает данные товара, которые используются для заполнения атрибутов элементов модального окна. 

#### Класс ModalBusket
Расширяет класс Modal. Предназначен для реализации модального окна c с информацие о состоянии корзины. При нажатии на кнопку инициируется событие.
Поля класса:
- Button: HTMLButtonElement - Кнопка перехода к оформлению
- totalPrice: number - сумма стоимости всех товаров в корзине 


Методы:
- goToCheckout(): void - иницирует событие  
- open(data: CardInBusket[]): void - расширение родительского метода, принимает данные корзины, которые используются для заполнения атрибутов элементов модального окна. 

#### Класс ModalOrderDelivery
Расширяет класс Modal. Предназначен для реализации модального окна c формой информации о доставке. При сабмите инициирует событие передавая в него объект с данными из полей ввода формы. При изменении данных в полях ввода инициирует событие изменения данных.\
Поля класса:
- Button: HTMLButtonElement - Кнопка подтверждения
- _form: HTMLFormElement - элемент формы
- formName: string - значение атрибута name формы
- inputs: NodeListOf<HTMLInputElement> - коллекция всех полей ввода формы



Методы:
- changeTemplate: void - перерисовывает модальное окно, для перехода на следующий этап заполнения данных заказа.
- setValid(isValid: boolean): void - изменяет активность кнопки подтверждения
- getInputValues(): Record<string, string> - возвращает объект с данными из полей формы, где ключ - name инпута, значение - данные введенные пользователем
- submit(): void - иницирует событие  
- close (): void - расширяет родительский метод дополнительно при закрытии очищая поля формы и деактивируя кнопку сохранения
- get form: HTMLElement - геттер для получения элемента формы

#### Класс ModalSuccess
Расширяет класс Modal. Предназначен для реализации модального окна отображающего успешность заказа. При открытии модального окна получает данные суммы заказа При нажатии на кнопку инициируется событие.
Поля класса:
- Button: HTMLButtonElement - Кнопка подтверждения

Методы:
- addToBusket(): void - иницирует событие 
- open(data: TTotalPrice): void - расширение родительского метода, принимает данные товара, которые используются для заполнения атрибутов элементов модального окна. 

#### Класс Card
Отвечает за отображение карточки товара, задавая в карточке данные названия, изображения, описания, цены, категории. Класс используется для отображения карточек товара на странице сайта. В конструктор класса передается DOM элемент темплейта, что позволяет при необходимости формировать карточки разных вариантов верстки. В классе устанавливаются слушатели на все интерактивные элементы, в результате взаимодействия с которыми пользователя генерируются соответствующие события.\
Поля класса содержат элементы разметки элементов карточки. Конструктор, кроме темплейта принимает экземпляр `EventEmitter` для инициации событий.\
Методы:
- setData(cardData: ICard): void - заполняет атрибуты элементов карточки данными
- deleteCard(): void - метод для удаления разметки карточки
- render(): HTMLElement - метод возвращает полностью заполненную карточку с установленными слушателями
- геттер id возвращает уникальный id карточки

#### Класс CardsContainer
Отвечает за отображение блока с карточками на главной странице. Cеттер `container` для полного обновления содержимого. В конструктор принимает контейнер, в котором размещаются карточки.

### Слой коммуникации

#### Класс AppApi
Принимает в конструктор экземпляр класса Api и предоставляет методы реализующие взаимодействие с бэкендом сервиса.

## Взаимодействие компонентов
Код, описывающий взаимодействие представления и данных между собой находится в файле `index.ts`, выполняющем роль презентера.\
Взаимодействие осуществляется за счет событий генерируемых с помощью брокера событий и обработчиков этих событий, описанных в `index.ts`\
В `index.ts` сначала создаются экземпляры всех необходимых классов, а затем настраивается обработка событий.

*Список всех событий, которые могут генерироваться в системе:*\
*События изменения данных (генерируются классами моделями данных)*
- `busket:changed` - изменение массива карзины
- `order:filled` - данные заказа заполнены, и внесены в объект


*События, возникающие при взаимодействии пользователя с интерфейсом (генерируются классами, отвечающими за представление)*
- `cardFull:open` - открытие модального окна с карточкой с подробной информацией о товаре
- `busket:open` - открытие модального корзины
- `order:open` - открытие модального окна с формой данных о заказе
- `success:open` - открытие модального окна с сообщением о создании заказа и суммой заказа
- `order:next` - переход к след. форме данных о заказе
- `card:add` - добавление товара в корзину
- `card:delete` - удаление карточки из корзины
- `edit-order:input` - изменение данных в форме с данными пользователя (номер, email)
- `edit-delivery:input` - изменение данных в форме с данными доставки (адрес, способ оплаты)
- `delivery:submit` - сохранение информации о заказе

