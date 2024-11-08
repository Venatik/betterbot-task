import { Component, inject, signal } from "@angular/core";
import { Product } from "../../types/product.interface";
import { ProductsService } from "../../core/services/products.service";
import { ProductComponent } from "../product/product.component";
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [ProductComponent, MatGridListModule],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  private productsService = inject(ProductsService);

  products = signal<Product[]>([]);
  breakpoint: number = 0;

  ngOnInit() {
    this.getProducts();
    // this.calculateBreakpoint(window.innerWidth);
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

  // calculateBreakpoint(innerWidth: number = window.innerWidth) {
  //   if (innerWidth <= 480) {
  //     this.breakpoint = 1;
  //   } else if (innerWidth <= 768) {
  //     this.breakpoint = 2;
  //   } else if (innerWidth <= 1024) {
  //     this.breakpoint = 3;
  //   } else if (innerWidth <= 1200) {
  //     this.breakpoint = 4;
  //   } else {
  //     this.breakpoint = 5;
  //   }
  // }

  // onResize(event: any) {
  //   this.calculateBreakpoint(event.target.innerWidth);
  // }
}
