import { Component, inject, signal, effect } from "@angular/core";
import { Product } from "../../types/product.interface";
import { ProductsService } from "../../core/services/products.service";
import { ProductComponent } from "../product/product.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { CartService } from "../../core/services/cart.service";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { catchError, EMPTY, finalize } from "rxjs";
import { animate, style, transition, trigger } from "@angular/animations";
import { FilterService } from "../../core/services/filter.service";
import { CapitalizePipe } from "../../shared/pipes/capitalize.pipe";

@Component({
  selector: "app-home",
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
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    CapitalizePipe,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private filterService = inject(FilterService);

  loading = signal(false);
  products = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  categories = signal<string[]>([]);
  selectedCategory: string = this.filterService.getCategoryFilter()() || "";

  constructor() {
    effect(
      () => {
        const searchTerm = this.filterService.getSearchFilter()();
        const categoryFilter = this.filterService.getCategoryFilter()();
        if (this.products().length > 0) {
          const filtered = this.getFilteredProducts(searchTerm, categoryFilter);
          this.filteredProducts.set(filtered);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    this.getProducts();
    this.getCategories();
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.filterService.setCategoryFilter(value);
    this.filterProducts();
  }

  getProducts() {
    this.loading.set(true);
    this.productsService
      .getAllProducts()
      .pipe(
        finalize(() => this.loading.set(false)),
        catchError(err => {
          console.error("Error loading products:", err);
          return EMPTY;
        })
      )
      .subscribe({
        next: value => {
          this.products.set(value);
          this.filteredProducts.set(value);
          this.filterProducts();
        },
      });
  }

  getCategories() {
    this.productsService
      .getCategories()
      .pipe(
        catchError(err => {
          console.error("Error loading categories:", err);
          return EMPTY;
        })
      )
      .subscribe({
        next: categories => this.categories.set(categories),
      });
  }

  private getFilteredProducts(
    searchTerm: string,
    categoryFilter: string
  ): Product[] {
    searchTerm = searchTerm.toLowerCase();
    let filtered = this.products();

    if (searchTerm) {
      filtered = filtered.filter(
        product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(
        product => product.category === categoryFilter
      );
    }

    return filtered;
  }

  filterProducts() {
    const searchTerm =
      this.filterService.getSearchFilter()()?.toLowerCase() || "";
    const filtered = this.getFilteredProducts(
      searchTerm,
      this.selectedCategory
    );
    this.filteredProducts.set(filtered);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
