import { Component, inject, Input, signal } from "@angular/core";
import { Product } from "../../types/product.interface";
import { ProductsService } from "../../core/services/products.service";
import { ProductComponent } from "../product/product.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { CartService } from "../../core/services/cart.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [ProductComponent, MatGridListModule, CommonModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);
  breakpoint: number = 0;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: value => {
        this.products.set(value);
      },
      error: err => {
        console.log(err);
      },
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
