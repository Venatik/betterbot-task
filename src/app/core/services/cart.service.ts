import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../../types/product.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems = signal<Product[]>([]);

  addToCart(product: Product) {
    const currentItems = this.cartItems();
    this.cartItems.set([...currentItems, product]);
  }

  removeFromCart(product: Product) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(item => item !== product);
    this.cartItems.set(updatedItems);
  }

  getCartItems() {
    return this.cartItems();
  }
}
