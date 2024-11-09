import { inject, Injectable } from "@angular/core";
import { API_URL } from "../core.constants";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Product } from "../../types/product.interface";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private http = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_URL}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }

  getCategories(): Observable<string[]> {
    console.log("Fetching categories...");
    return this.http.get<string[]>(`${API_URL}/products/categories`).pipe(
      tap(categories => console.log("Categories received:", categories)),
      catchError(error => {
        console.error("Error fetching categories:", error);
        return throwError(() => error);
      })
    );
  }
}
