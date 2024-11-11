import { Injectable, signal } from "@angular/core";
import { Product } from "../../types/product.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems = signal<(Product & { cartId: number })[]>([]);
  private currentId = 0;

  addToCart(product: Product) {
    const currentItems = this.cartItems();
    this.cartItems.set([
      ...currentItems,
      { ...product, cartId: this.currentId++ },
    ]);
  }

  removeFromCart(itemToRemove: Product & { cartId: number }) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(
      item => item.cartId !== itemToRemove.cartId
    );
    this.cartItems.set(updatedItems);
  }

  getCartItems() {
    return this.cartItems();
  }
}
