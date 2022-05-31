import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItemDetailed } from 'src/app/shared/models/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItemsDetailed: CartItemDetailed[] = [];
  cartCount = 0;
  endSubs$: Subject<any> = new Subject();
  constructor( private cartService: CartService,) { }
  //items$ = this.cartService.items$;
  ngOnInit(): void {
  }

}
