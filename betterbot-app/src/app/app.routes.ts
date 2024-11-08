import { Routes } from "@angular/router";
import { ProductsComponent } from "./features/products/products.component";
import { CartComponent } from "./features/cart/cart.component";

export const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
];
