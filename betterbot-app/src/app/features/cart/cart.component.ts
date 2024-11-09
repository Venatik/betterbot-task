import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { CartService } from "../../core/services/cart.service";
import { CurrencyPipe } from "@angular/common";
import { Product } from "../../types/product.interface";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, MatIconModule],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent {
  private cartService = inject(CartService);
  cartItems = this.cartService.getCartItems();
  displayedColumns: string[] = ["image", "name", "price", "delete"];

  calculateTotal(items: Product[]): number {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  removeItem(item: Product) {
    this.cartService.removeFromCart(item);
  }
}
