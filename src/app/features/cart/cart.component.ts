import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { CartService } from "../../core/services/cart.service";
import { CurrencyPipe } from "@angular/common";
import { Product } from "../../types/product.interface";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { computed } from "@angular/core";
import { CartItem } from "../../types/cart-item.interface";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, MatIconModule, RouterLink],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent {
  private cartService = inject(CartService);
  private readonly TAX_RATE = 0.125;

  cartItems = computed(() => this.cartService.getCartItems());
  displayedColumns: string[] = ["image", "name", "price", "delete"];

  isCartEmpty = computed(() => {
    return this.cartItems().length === 0;
  });

  subtotal = computed(() => {
    return this.calculateTotal(this.cartItems());
  });

  tax = computed(() => {
    return this.subtotal() * this.TAX_RATE;
  });

  total = computed(() => {
    return this.subtotal() + this.tax();
  });

  calculateTotal(items: Product[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  calculateTotalWithTax(items: Product[]): number {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * this.TAX_RATE;
    return subtotal + tax;
  }

  removeItem(item: Product & { cartId: number }) {
    this.cartService.removeFromCart(item);
  }
}
