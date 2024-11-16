import { IApi, ICard, IOrder, IProductList } from '../types'


export class AppApi {
    
   private _baseApi: IApi
    constructor(baseApi: IApi){
        this._baseApi = baseApi;
    }

    getProducts(): Promise<IProductList>{
        return this._baseApi.get<IProductList>('/product/').then((products: IProductList)=> products)
    }
    getProduct(productId: string): Promise<ICard>{
        return this._baseApi.get<ICard>(`/product/${productId}`).then((product: ICard)=> product)
    }
    postOrder(data: IOrder): Promise<object>{
        return this._baseApi.post<object>('/order', data).then((res: object)=> res)
    }
}