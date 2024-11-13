import {
  Component,
  computed,
  inject,
  signal,
  effect,
  ViewEncapsulation,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "../services/theme.service";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CartService } from "../services/cart.service";
import { MatBadgeModule } from "@angular/material/badge";
import { FilterService } from "../services/filter.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatBadgeModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private cartService = inject(CartService);
  private filterService = inject(FilterService);

  darkMode = this.themeService.isDarkMode();
  cartItemCount = computed(() => {
    const items = this.cartService.getCartItems();
    return items.length;
  });

  user = "Henry";

  showMenu = signal(false);
  isSmallScreen = signal(false);
  searchControl = new FormControl(this.filterService.getSearchFilter()());

  constructor() {
    if (typeof window !== "undefined") {
      this.checkScreenSize();
      fromEvent(window, "resize")
        .pipe(debounceTime(100))
        .subscribe(() => this.checkScreenSize());
    }
    this.setupSearchListener();
  }

  private setupSearchListener() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => {
        this.filterService.setSearchFilter(value || "");
      });
  }

  private checkScreenSize() {
    this.isSmallScreen.set(window.innerWidth < 768);
    if (!this.isSmallScreen()) {
      this.showMenu.set(false);
    }
  }

  toggleMenu() {
    this.showMenu.update(value => !value);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
