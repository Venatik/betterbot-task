import { Component, inject, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from "../services/theme.service";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

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
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  darkMode = this.themeService.isDarkMode();

  showMenu = signal(false);
  isSmallScreen = signal(false);

  constructor() {
    // Listen for window resize
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
