import { Component, computed, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "../services/theme.service";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { CartService } from "../services/cart.service";
import { MatBadgeModule } from "@angular/material/badge";

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
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  private cartService = inject(CartService);
  darkMode = this.themeService.isDarkMode();
  cartItemCount = computed(() => {
    const items = this.cartService.getCartItems();
    return items.length;
  });

  showMenu = signal(false);
  isSmallScreen = signal(false);

  constructor() {
    if (typeof window !== "undefined") {
      this.checkScreenSize();
      fromEvent(window, "resize")
        .pipe(debounceTime(100))
        .subscribe(() => this.checkScreenSize());
    }
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
