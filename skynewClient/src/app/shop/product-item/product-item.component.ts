import { BasketService } from './../../basket/basket.service';
import { IProduct } from './../../shared/Models/product';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  constructor(private basketSerivice: BasketService) { }

  ngOnInit(): void {
  }

  addItemToBasket(){
    this.basketSerivice.addItemToBasket(this.product);
  }

}
