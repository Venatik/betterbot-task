import { Component, Input } from "@angular/core";
import { Product } from "../../types/product.interface";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBadgeModule } from "@angular/material/badge";
import { ProductDetailsComponent } from "../product-details/product-details.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { inject } from "@angular/core";

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
    MatDialogModule,
  ],
  templateUrl: "./product.component.html",
  styleUrl: "./product.component.scss",
})
export class ProductComponent {
  @Input() product!: Product;
  discount: number;
  private dialog = inject(MatDialog);

  constructor() {
    this.discount = Math.floor(Math.random() * 11) + 5;
  }

  showDetails() {
    this.dialog.open(ProductDetailsComponent, {
      data: this.product,
      width: "500px",
    });
  }
}
