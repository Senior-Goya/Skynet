import { ShopParms } from './../shared/Models/shopParams';
import { IProductType } from './../shared/Models/productType';
import { IBrand } from './../shared/Models/brand';
import { IProduct } from '../shared/Models/product';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search' , {static : false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  productTypes: IProductType[];
 
  ShopParms = new ShopParms();
  totalCount: number;

  sortOptions = [
    {name: 'Alphabetical', value : 'name'},
    {name:'Price: Low to High', value: 'priceAsc'},
    {name:'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shop: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getProductTypes();
  
  }


  getProducts(){
    this.shop.getProducts(this.ShopParms).subscribe(response => {
      this.products = response.data;
      this.ShopParms.pageNumber = response.pageIndex;
      this.ShopParms.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });

  }

  getBrands(){
    this.shop.getBrands().subscribe(response => {
      this.brands = [{id: 0 , name: 'All'}, ...response];
    }, error => {
      console.log(error)
    })
  }
  getProductTypes(){
    this.shop.getProductTypes().subscribe(response => {
      this.productTypes = [{id: 0 , name: 'All'}, ...response];
    }, error => {
      console.log(error)
    })
  }


  onBrandSelected(brandId: number)
  {
    this.ShopParms.brandId = brandId;
    this.ShopParms.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number)
  {
    this.ShopParms.typeId = typeId;
    this.ShopParms.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.ShopParms.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any)
  {
    if(this.ShopParms.pageNumber !== event){
      this.ShopParms.pageNumber = event;
      this.getProducts();
    }
   
  }

  onSearch()
  {
    this.ShopParms.search = this.searchTerm.nativeElement.value;
    this.ShopParms.pageNumber = 1;
    this.getProducts();
  }


  onReset()
  {
    this.searchTerm.nativeElement.value = "";
    this.ShopParms = new ShopParms();
    this.getProducts();


  }

}
