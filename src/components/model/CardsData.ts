import { ICard, IProductList } from "../../types";

export class CardsData{
    _catalog: ICard[]
    set catalog(catalog: ICard[]){
        this._catalog = catalog
    }
    get catalog(){
        return this._catalog
    }
    getById(id:string){
       return this.catalog.find((item: ICard) => item.id == id)
    }
}