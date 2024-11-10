import { Component, inject, Input, signal } from "@angular/core";
import { Product } from "../../types/product.interface";
import { ProductsService } from "../../core/services/products.service";
import { ProductComponent } from "../product/product.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { CartService } from "../../core/services/cart.service";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { finalize } from "rxjs";
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-products",
  standalone: true,
  animations: [
    trigger("staggerFade", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("500ms", style({ opacity: 1 })),
      ]),
    ]),
  ],
  imports: [
    ProductComponent,
    MatGridListModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);

  loading = signal(false);
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  categories = signal<string[]>([]);

  searchControl: FormControl = new FormControl("");
  categoryControl: FormControl = new FormControl("");
  selectedCategory: string = "";

  breakpoint: number = 0;

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.loading.set(true);
    this.productsService
      .getAllProducts()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: value => {
          this.products.set(value);
          this.filteredProducts.set(value);
        },
        error: err => {
          console.log(err);
        },
      });
  }

  getCategories() {
    this.productsService.getCategories().subscribe({
      next: categories => {
        this.categories.set(categories);
      },
      error: err => {
        console.log("Error loading categories", err);
      },
    });
  }

  filterProducts() {
    const searchTerm = this.searchControl.value?.toLowerCase() || "";
    let filtered = this.products();

    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(
        product => product.category === this.selectedCategory
      );
    }

    this.filteredProducts.set(filtered);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
