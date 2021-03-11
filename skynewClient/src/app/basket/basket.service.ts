import { IProduct } from './../shared/Models/product';
import { IBAsket, Basket, IBasketItem, IBasketTotals } from './../shared/Models/basket';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
baseUrl = environment.apiUrl;
private basketSource = new BehaviorSubject<IBAsket>(null);
basket$ = this.basketSource.asObservable();
private basektTotalSource = new BehaviorSubject<IBasketTotals>(null);
basketTotal$ = this.basektTotalSource.asObservable();
constructor(private http: HttpClient) { }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBAsket) => {
        this.basketSource.next(basket);
        this.calculateTotals();

      })
    );
  }

  setBasket(basket: IBAsket) {
    return this.http.post(this.baseUrl + 'basket', basket)
    .subscribe((response: IBAsket) => {
      this.basketSource.next(response);
      this.calculateTotals();
    }, error => {
      console.log(error);
    });
  }


  getCurrentBasketValue() {
    return this.basketSource.value;
  }


  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBaseket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);


  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    if(basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }
    else {
      this.removeItemFromBasket(item);
    }

  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if(basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
    }
    if(basket.items.length >= 0) {
      this.setBasket(basket);
    } else {
      this.deleteBasket(basket);
    }
  }
  deleteBasket(basket: IBAsket) {
    return this.http.delete(this.baseUrl +  'basket?id=' + basket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basektTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  }



  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subTotal = basket.items.reduce((a , b) => (b.price) * (b.quantity) + a, 0);
    const total = subTotal + shipping;
    this.basektTotalSource.next({shipping, total, subTotal});
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;

  }
  private createBaseket(): IBAsket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id : item.id,
      productName: item.name,
      price: item.price,
      pictureUrl : item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType
    };
  }


}
