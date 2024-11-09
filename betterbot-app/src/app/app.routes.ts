import { Routes } from "@angular/router";
import { ProductsComponent } from "./features/products/products.component";
import { CartComponent } from "./features/cart/cart.component";
import { NotFoundComponent } from "./core/not-found/not-found.component";
import { CheckoutComponent } from "./features/checkout/checkout.component";

export const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
  {
    path: "not-found",
    component: NotFoundComponent,
  },
  {
    path: "**",
    redirectTo: "not-found",
  },
];
