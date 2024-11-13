import { Injectable, signal } from "@angular/core";
import { Product } from "../../types/product.interface";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems = signal<(Product & { cartId: number })[]>(
    this.loadCartFromStorage()
  );
  private currentId = this.getLastUsedId();

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private getLastUsedId() {
    const savedCart = this.loadCartFromStorage();
    return savedCart.length > 0
      ? Math.max(...savedCart.map((item: { cartId: any }) => item.cartId)) + 1
      : 0;
  }

  private saveCartToStorage() {
    localStorage.setItem("cart", JSON.stringify(this.cartItems()));
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems();
    this.cartItems.set([
      ...currentItems,
      { ...product, cartId: this.currentId++ },
    ]);
    this.saveCartToStorage();
  }

  removeFromCart(itemToRemove: Product & { cartId: number }) {
    const currentItems = this.cartItems();
    const updatedItems = currentItems.filter(
      item => item.cartId !== itemToRemove.cartId
    );
    this.cartItems.set(updatedItems);
    this.saveCartToStorage();
  }

  getCartItems() {
    return this.cartItems();
  }
}
