import {
  Component,
  EventEmitter,
  inject,
  Input,
  input,
  Output,
  signal,
} from "@angular/core";
import { Product } from "../../types/product.interface";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { ProductsService } from "../../core/services/products.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";

@Component({
  selector: "app-product",
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  products = signal<Product[]>([]);
  discount: number = 0;
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  private productsService = inject(ProductsService);

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

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
