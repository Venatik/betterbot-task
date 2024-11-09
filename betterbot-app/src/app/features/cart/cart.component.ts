import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { CartService } from "../../core/services/cart.service";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Product } from "../../types/product.interface";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [MatTableModule, CurrencyPipe, AsyncPipe],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems$ = this.cartService.getCartItems();

  displayedColumns: string[] = ["image", "name", "price"];

  protected readonly emptyCart: Product[] = [];
}
