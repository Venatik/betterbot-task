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
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
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

  searchControl: FormControl = new FormControl(
    this.filterService.getSearchFilter()()
  );
  selectedCategory: string = this.filterService.getCategoryFilter()() || "";

  ngOnInit() {
    this.getProducts();
    this.getCategories();

    this.searchControl.valueChanges.subscribe(value => {
      this.filterService.setSearchFilter(value || "");
      this.filterProducts();
    });
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
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: value => {
          this.products.set(value);
          this.filteredProducts.set(value);
          this.filterProducts();
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
