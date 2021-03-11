import { Observable } from 'rxjs';
import { BasketService } from './../../basket/basket.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IBAsket } from 'src/app/shared/Models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private basketService: BasketService) { }
  basket$: Observable<IBAsket>;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

}
