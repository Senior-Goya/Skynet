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
  constructor(private shopService: ShopService , private activatedRoute: ActivatedRoute, private breadCrumb: BreadcrumbService) {
    this.breadCrumb.set('@productDetails', '');
   }

  ngOnInit(): void {
    this.loadProduct();
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
