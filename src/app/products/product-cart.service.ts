import { Injectable } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {
  cart: number[];
  constructor(
    private authService: AuthService
  ) {
    this.cart = [];
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  }
  addToCart(id: number): string {
    if (this.cart.indexOf(id) === -1) {
      this.cart.push(id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      console.log(this.cart);
      return 'Product Sucessfully added in cart.';
    } else {
      console.log(this.cart);
      return 'Product is already in cart.';
    }
  }
}
