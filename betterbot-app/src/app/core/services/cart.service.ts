import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../../types/product.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);

  constructor() {}

  addToCart(product: Product) {
    const currentItems = this.cartItems.getValue();

    this.cartItems.next([...currentItems, product]);
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }
}
