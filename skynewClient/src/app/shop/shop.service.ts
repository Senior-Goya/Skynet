import { ShopParms } from './../shared/Models/shopParams';
import { IProductType } from './../shared/Models/productType';
import { IBrand } from './../shared/Models/brand';
import { IPagination } from '../shared/Models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParms:ShopParms) {
    let params = new HttpParams();
    if(shopParms.brandId !== 0)
    {
      params = params.append('brandId', shopParms.brandId.toString());
    }

    if(shopParms.typeId !== 0)
    {
      params = params.append('typeId', shopParms.typeId.toString());
    }

    if(shopParms.search)
    {
      params = params.append('search',shopParms.search);
    }

   
      params = params.append('sort',shopParms.sort);
      params = params.append('pageIndex',shopParms.pageNumber.toString());
      params = params.append('pageIndex ',shopParms.pageSize.toString());
    

    return this.http.get<IPagination>(this.baseUrl + 'products' , {observe: 'response',params})
    .pipe
    (
      map(response => 
        {
          return response.body;
        })
    )
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
  
  getProductTypes(){
    return this.http.get<IProductType[]>(this.baseUrl + 'products/types')
  }


}
