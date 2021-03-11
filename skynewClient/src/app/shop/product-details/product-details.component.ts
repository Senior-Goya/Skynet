import { BasketService } from './../../basket/basket.service';
import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/Models/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  product: IProduct;
  quantity = 1;
  // tslint:disable-next-line: max-line-length
  constructor(private shopService: ShopService , private activatedRoute: ActivatedRoute, private breadCrumb: BreadcrumbService, private basketService: BasketService) {
    this.breadCrumb.set('@productDetailsz', '');
   }

  ngOnInit(): void {
    this.loadProduct();
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

  incrementQuantity() {
    this.quantity++;

  }
  decrementQuantity() {
    if (this.quantity > 1 ) { this.quantity--; }

  }

  

  loadProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(product => {
      this.product = product;
      this.breadCrumb.set('@productDetails', product.name);
    }, error => {
      console.log(error);
    })
  }
  

  

}
