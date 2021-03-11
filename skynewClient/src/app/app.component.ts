import { BasketService } from './basket/basket.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'skynewClient';


  constructor(private basketService: BasketService) {}

  ngOnInit()
  {
    const basketId = localStorage.getItem('basket_id');
    if(basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('intialized basket');
      }, error => {
        console.log(error);
      });
    }

  }
}
