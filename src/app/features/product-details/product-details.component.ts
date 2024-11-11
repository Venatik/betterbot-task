import { Component, Inject, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Product } from "../../types/product.interface";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from "@angular/material/dialog";
import { CapitalizePipe } from "../../shared/pipes/capitalize.pipe";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CapitalizePipe,
    CurrencyPipe,
  ],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  close() {
    this.dialogRef.close();
  }
}
