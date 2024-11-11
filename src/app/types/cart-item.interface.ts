import { Product } from "./product.interface";

export interface CartItem extends Product {
  cartId: number;
}
