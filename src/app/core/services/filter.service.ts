import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FilterService {
  private searchFilter = signal("");
  private categoryFilter = signal("");

  setSearchFilter(value: string) {
    this.searchFilter.set(value);
  }

  getSearchFilter() {
    return this.searchFilter;
  }

  setCategoryFilter(value: string) {
    this.categoryFilter.set(value);
  }

  getCategoryFilter() {
    return this.categoryFilter;
  }
}
